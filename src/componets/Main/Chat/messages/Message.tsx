import React from "react";
import s from "./Messages.module.css";
import avaMale from "../../../../img/ava_male.jpeg";
import { NavLink } from "react-router-dom"

type propsType = {
    userId: number
    key: string
    message: string
    isMe: boolean
    ava: string | null
    userName: string
}

export const Message = React.memo((props: propsType) => {
    
    return (
        <div className={s.messageWrap + " " + (props.isMe && s.messageWrapOwner)}>
            <div className={s.userPhotoContainer}>
                <NavLink to={`/profile/${props.userId}`}>
                    <img className={s.userPhoto} src={props.ava || avaMale} alt="AVA" />
                </NavLink>
            </div>
            <div>{props.userName}</div>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                <span>{props.message}</span>
            </div>
            
        </div>
        
    )
})



