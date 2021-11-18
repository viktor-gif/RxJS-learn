import React from "react";
import { dialogsPageType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";

type dialogsPropsType = {
    dialogsPage: dialogsPageType
}
type dialogPropsType = {
    id: number
    key: number
    url: string
    name: string
    sex: string
}
type messagePropsType = {
    id: number
    key: number
    message: string
    isMe: boolean
}

export const Dialogs = (props: dialogsPropsType) => {
    const dialogs = props.dialogsPage.dialogs;
    const messages = props.dialogsPage.messages;
    

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages.map(m => {
        return <Message id={m.id} key={m.id} isMe={m.isMe} message={m.message} />
    })

    return (
        <div className={s.messagesContainer}>
            <div className={s.usersWrap}>
                {usersItems}
            </div>
            <div className={s.messagesWrap}>
                {messagesItems}
            </div>
        </div>
    )
}

export const Dialog = (props: dialogPropsType) => {
    return (
        <div className={s.dialog}>
            <div className={s.avatar}>
                <img src={props.sex === "male" ? avaMale : avaFemale} alt="User" />
            </div>
            <div className={s.userName}>{props.name}</div>
        </div>
    )
}

export const Message = (props: messagePropsType) => {
    return (
        <div className={props.isMe ? s.messageWrap : ""}>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                {props.message}
            </div>
        </div>
        
    )
}

