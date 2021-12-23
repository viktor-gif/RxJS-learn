import React from "react";
import { dialogsType, messagesType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"

type dialogsPropsType = {
    dialogs: dialogsType
    messages: messagesType
    newMessageText: string
    isAuth: boolean
    addMessage: () => void
    updateMessageText: (text: string) => void
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

export const Dialogs = React.memo((props: dialogsPropsType) => {
    const dialogs = props.dialogs;
    const messages = props.messages;
    const newMessageText = props.newMessageText;

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages.map(m => {
        return <Message id={m.id} key={m.id} isMe={m.isMe} message={m.message} />
    })

    const sendMessage = () => {
        props.addMessage()
    }

    const onMessageTextChange = (e: any) => {
        if (e.target.value[e.target.value.length - 1] !== '\n') {
            props.updateMessageText(e.target.value);
        } else {
            props.addMessage()
        }
    }

    return (
        <div className={s.messagesContainer}>
            <div className={s.usersWrap}>
                {usersItems}
            </div>
            <div className={s.messagesWrap}>
                {messagesItems}
                <div className={s.messageInput}>
                    <textarea value={newMessageText}
                        onChange={onMessageTextChange}></textarea>
                </div>
                <button className={s.sendMessage} onClick={sendMessage}>
                    Send message
                </button>
            </div>
        </div>
    )
})

export const Dialog = React.memo((props: dialogPropsType) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${props.id}`}><div className={s.avatar}>
                <img src={props.sex === "male" ? avaMale : avaFemale} alt="User" />
            </div>
            <div className={s.userName}>{props.name}</div></NavLink>
        </div>
    )
})

export const Message = React.memo((props: messagePropsType) => {
    return (
        <div className={props.isMe ? s.messageWrap : ""}>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                {props.message}
            </div>
        </div>
        
    )
})

