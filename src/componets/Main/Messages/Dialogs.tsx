import React from "react";
import { dialogsPageType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"

type dialogsPropsType = {
    dialogsPage: dialogsPageType
    dispatch: any
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
    const newMessageText = props.dialogsPage.newMessageText;

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages.map(m => {
        return <Message id={m.id} key={m.id} isMe={m.isMe} message={m.message} />
    })

    const sendMessage = (e: any) => {
        props.dispatch({type: "ADD_MESSAGE"})
    }

    const onMessageTextChange = (e: any) => {
        props.dispatch({
            type: "MESSAGE_TEXT_CHANGE",
            messageText: e.target.value
        });
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
}

export const Dialog = (props: dialogPropsType) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${props.id}`}><div className={s.avatar}>
                <img src={props.sex === "male" ? avaMale : avaFemale} alt="User" />
            </div>
            <div className={s.userName}>{props.name}</div></NavLink>
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

