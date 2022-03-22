import React, { useEffect, useState } from "react";
import s from "./Message.module.css";
import avaMale from "../../../../../img/ava_male.jpeg";
import { NavLink } from "react-router-dom"
import deleteIcon from "../../../../../img/icons/delete-icon.png"
import { dialogsAPI } from "../../../../../api/dialogs-api";

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
    
    deleteMessage: (id: number | string, dialogId: number) => void
}

export const Message = React.memo((props: propsType) => {

    const [isViewed, setViewed] = useState(false)

    useEffect(() => {
        dialogsAPI.isViewedMessage(props.id).then(res => {
            setViewed(res.data)
        })
    }, [])

    let dialogId = props.isMe ? props.recipientId : props.senderId

    const deleteMessage = () => {
        props.deleteMessage(props.id, dialogId)
    }
    return (
        
        <div className={s.messageWrap + " " + (props.isMe && s.messageWrapOwner)}>
            <div className={s.userPhotoContainer}>
                <NavLink to={`/profile/${props.id}`}>
                    <img className={s.userPhoto} src={props.ava || avaMale} alt="AVA" />
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
                    <img className={s.deleteIconPic} src={deleteIcon} onClick={deleteMessage} />
                </div>
                }
            </div>

            {/* <div className={s.deleteShure}>
                Are you shure?
                <button>yes</button><button>no</button>
            </div> */}
            
        </div>
            
        
    )
})



