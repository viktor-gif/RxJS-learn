import React, { useEffect, useState } from "react";
import { dialogsType } from "../../../redux/store";
// import { messagesType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"

type dialogsPropsType = {
    dialogs: dialogsType
    newMessageText: string
    isAuth: boolean
    ownerId: number
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
    ava: string | null
    userName: string
}

type messagesType = {
    userId: number
    userName: string
    message: string
    photo: string | null
}

let ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

const Dialogs = React.memo((props: dialogsPropsType) => {
    const [messages, setMessages] = useState<messagesType[] | null>(null)
    const [messageText, setMessageText] = useState('')

    
    console.log(ws)

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            console.log(JSON.parse(e.data))
            let newMessages = JSON.parse(e.data)
            setMessages((prev) => prev ? [...prev, ...newMessages] : newMessages)
        })
    }, [])

    const dialogs = props.dialogs;

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages?.map((m, index) => {
        return <Message id={m.userId} key={index} isMe={m.userId === props.ownerId} message={m.message} ava={m.photo} userName={m.userName} />
    })

    const sendMessage = () => {
        if (!messageText || messageText.length < 1) return
        ws.send(messageText)
        setMessageText('')
    }

    const onMessageTextChange = (e: any) => {
        setMessageText(e.target.value);
        
    }

    return (
        <div className={s.messagesContainer}>
            <div className={s.usersWrap}>
                {usersItems}
            </div>
            <div className={s.messagesWrap}>
                {messagesItems}
                <div className={s.messageInput}>
                    <textarea value={messageText}
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
        <div className={s.messageWrap + " " + (props.isMe && s.messageWrapOwner)}>
            <div className={s.userPhotoContainer}>
                <img className={s.userPhoto} src={props.ava || avaMale} alt="AVA" />
            </div>
            <div>{props.userName.slice(0, 8) + "..."}</div>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                <span>{props.message}</span>
            </div>
            
        </div>
        
    )
})

export default Dialogs


