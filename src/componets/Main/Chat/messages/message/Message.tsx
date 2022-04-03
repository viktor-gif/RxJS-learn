import React, { useEffect, useState } from "react";
import s from "./Message.module.css";
import avaMale from "../../../../../img/ava_male.jpeg";
import { NavLink } from "react-router-dom"
import deleteIcon from "../../../../../img/icons/delete-icon.png"
import spamIcon from "../../../../../img/icons/spam-icon.png"
import { dialogsAPI } from "../../../../../api/dialogs-api";
import { Button } from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../../../../redux/store";
import { profileAPI } from "../../../../../api/api";

type propsType = {
    id: string | number
    key: string
    message: string
    isMe: boolean
    ava: string | null
    userName: string
    messageType: "dialog" | "commonChat"
    senderId: number
    recipientId: number
    ownerId: number
    
    deleteMessage: (id: number | string) => void
    restoreMessage: (id: number | string) => void
}

export const Message = React.memo((props: propsType) => {

    const [isActiveDeleteMenu, setActiveDeleteMenu] = useState(false)
    const [isDeletedMessage, setDeletedMessage] = useState(false)
    const [actionWindowType, setActionWindowType] = useState<'delete' | 'restore'>('delete')
    const [userPhoto, setUserPhoto] = useState<string | null>(null)
    const [isViewed, setViewed] = useState(false)
    const [isActiveBurger, setActiveBurger] = useState(false)

    const profileInfo = useSelector((state: stateType) => state.profilePage.profileInfo)

    useEffect(() => {
        setTimeout(() => {
            dialogsAPI.isViewedMessage(props.id).then(res => {
                setViewed(res.data)
            })
        }, Math.random() * 5000)
        
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (props.isMe) {
                profileAPI.getProfileData(props.ownerId)
                    .then(res => setUserPhoto(res.data.photos.small))
                // dispatch(getProfileData(props.ownerId))
                // profileInfo && setUserPhoto(profileInfo.photos.small)
            } else {
                profileAPI.getProfileData(props.senderId)
                    .then(res => setUserPhoto(res.data.photos.small))
                // dispatch(getProfileData(props.senderId))
                // profileInfo && setUserPhoto(profileInfo.photos.small)
            }
        }, Math.random() * 5000)
    }, [])

    const deleteMessageMenuActive = () => {
        setActiveDeleteMenu(true)
        setActiveBurger(false)
    }
    const deleteMessage = () => {
        props.deleteMessage(props.id)
        setDeletedMessage(true)
        setActionWindowType('restore')
    }
    const addToSpam = () => {
        console.log('spam')
        setActiveBurger(false)
    }
    const resetDeledteMessage = () => {
        setActiveDeleteMenu(false)
    }
    const restoreMessage = () => {
        props.restoreMessage(props.id)
        setDeletedMessage(false)
        setActiveDeleteMenu(false)
        setActionWindowType('delete')
    }
    
    const toggleActiveBurgerMenu = () => {
        isActiveBurger ? setActiveBurger(false) : setActiveBurger(true)
    }
    return (
        <div>
            {isDeletedMessage 
                ?
                <ActionsWindow actionText="Message was deleted."
                    action1={restoreMessage}
                    actionWindowType={actionWindowType}
                    valueButton1="Restore" />
                
                :<div className={s.messageWrap + " " + (props.isMe && s.messageWrapOwner)}>
                    <div className={s.userPhotoContainer}>
                        <NavLink to={`/profile/${props.id}`}>
                            <img className={s.userPhoto} src={props.ava || userPhoto || avaMale} alt="AVA" />
                        </NavLink>
                    </div>
                    <div className={s.userName}>{props.userName}</div>
                    <div className={s.message + " " + (props.isMe && s.myMessage)}>
                        <span className={s.messageText + " " + (props.isMe && s.messageTextOwner)}>
                            {props.message}
                            {isViewed && <span className={s.viewedMessageIcon}>&#10003;</span>}
                        </span>
                    
                        <div className={s.burgerMenu + " " + (props.isMe && s.burgerMenuOwner)}
                            onClick={toggleActiveBurgerMenu}>
                            <div className={s.burgerMenuCentralElem}>
                        
                            </div>

                        </div>
                        
                        
                    </div>

                    <div className={s.deleteShure + ' ' + (isActiveDeleteMenu && s.activeDeleteMenu)}>
                        <ActionsWindow actionText="Are you shure?"
                            action1={deleteMessage} action2={resetDeledteMessage}
                            actionWindowType={actionWindowType}
                            valueButton1="Yes" valueButton2="No" />
                    </div>

                        <div className={s.menuMessageSmallScreen + " " + (props.isMe && s.menuMessageSmallScreenOwner)  + " " + (isActiveBurger && s.menuMessageSmallActive)}>
                            <ul>
                            <li onClick={deleteMessageMenuActive}>
                                <img src={deleteIcon} alt="" />
                                <span>Delete message</span>
                            </li>
                            <li onClick={addToSpam}>
                                <img src={spamIcon} alt="" />
                                <span>Add to spam</span>
                            </li>
                            </ul>
                        </div>

                </div>
            }
        </div>
    )
})

type confirmWindowPropsType = {
    actionWindowType: 'delete' | 'restore'
    actionText: string
    valueButton1: string
    valueButton2?: string
    action1: () => void
    action2?: () => void
}

const ActionsWindow = (props: confirmWindowPropsType) => {
    return (
        <div className={s.actionWindow}>
            <span>{props.actionText}</span>
            <div className={s.actionWindowButtons}>
                <Button value={props.valueButton1} click={props.action1} buttonType="actionWindow" />
                {props.actionWindowType === 'delete'
                    && <Button value={props.valueButton2 || ''} click={props.action2} buttonType="actionWindow" />
                }
            </div>
        </div>
    )
}



