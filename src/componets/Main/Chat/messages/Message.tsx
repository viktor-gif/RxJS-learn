import React from "react";
import s from "./Messages.module.css";
import avaMale from "../../../../img/ava_male.jpeg";
import { NavLink } from "react-router-dom"
import { profilePageActions } from "../../../../redux/profile-reducer";
import { Button } from "../../../common/buttons/Button";

type propsType = {
    id: number | string
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
            <div>{props.userName}</div>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                <span>{props.message}</span>
            </div>
            {props.messageType === "dialog" && 
                <Button click={deleteMessage} value="Delete message" buttonType="deleteMessage" />
            }
        </div>
            
        
    )
})



