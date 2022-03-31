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
    const [myPhoto, setMyPhoto] = useState(null)
    const [userPhoto, setUserPhoto] = useState<string | null>(null)
    const [isViewed, setViewed] = useState(false)

    console.log(userPhoto)

    const dispatch = useDispatch()

    const profileInfo = useSelector((state: stateType) => state.profilePage.profileInfo)
    
    console.log(profileInfo)

    useEffect(() => {
        dialogsAPI.isViewedMessage(props.id).then(res => {
            setViewed(res.data)
        })
    }, [])

    useEffect(() => {
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
    }, [])

    let dialogId = props.isMe ? props.recipientId : props.senderId

    const deleteMessage = () => {
        props.deleteMessage(props.id)
        setDeletedMessage(true)
        setActionWindowType('restore')
    }
    const resetDeleteMessage = () => {
        setActiveDeleteMenu(false)
    }
    const restoreMessage = () => {
        props.restoreMessage(props.id)
        setDeletedMessage(false)
        setActiveDeleteMenu(false)
        setActionWindowType('delete')
    }
    const addToSpam = () => {
        console.log('spam')
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
                        {props.messageType === "dialog" && 
                        <div className={s.menuMessage + " " + (props.isMe && s.menuMessageOwner)}>
                            <img className={s.deleteIconPic} src={deleteIcon} alt="delete" onClick={() => setActiveDeleteMenu(true)} />
                            <img className={s.spamIconPic} src={spamIcon} alt="spam" onClick={addToSpam} />
                        </div>
                        }
                    </div>

                    <div className={s.deleteShure + ' ' + (isActiveDeleteMenu && s.activeDeleteMenu)}>
                        <ActionsWindow actionText="Are you shure?"
                            action1={deleteMessage} action2={resetDeleteMessage}
                            actionWindowType={actionWindowType}
                            valueButton1="Yes" valueButton2="No" />
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



