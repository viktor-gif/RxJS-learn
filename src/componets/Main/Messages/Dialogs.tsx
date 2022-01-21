import React, { useEffect, useRef, useState } from "react";
import { dialogsType, stateType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../../redux/chat-reducer";
import { Preloader } from "../../common/preloader/preloader";
import { chatMessageAPIType } from "../../../api/chat-api";

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
    userId: number
    key: string
    message: string
    isMe: boolean
    ava: string | null
    userName: string
}

export type chatMessageType = chatMessageAPIType & {id: string}


const Dialogs = React.memo((props: dialogsPropsType) => {
    const [messageText, setMessageText] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isAutoscroll, setAutoscroll] = useState(true)

    const dispatch = useDispatch()

    const messages = useSelector((state: stateType) => state.chat.messages)
    const status = useSelector((state: stateType) => state.chat.status)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    useEffect(() => {
        isAutoscroll && messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const dialogs = props.dialogs;

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages?.map((m, index) => {
        
        return <Message userId={m.userId} key={m.id} isMe={m.userId === props.ownerId} message={m.message} ava={m.photo} userName={m.userName} />
    })

    const onsendMessage = () => {
        if (!messageText || messageText.length < 1) {
            setErrorMessage("You can not send an empty message")
            return
        } else if (messageText.length >= 100) {
            setErrorMessage("Max length is 100 symbols")
            return
        } else {
            dispatch(sendMessage(messageText))
            setMessageText('')
            setErrorMessage(null)
        }
        
    }

    const onMessageTextChange = (e: any) => {
        setMessageText(e.target.value);
        
    }

    if (messages.length < 1) {
        return <Preloader />
    }

    if (status === "error") {
        console.log("Error Chat")
    }

    const messagesScrollHandler = (e: any) => {
        setAutoscroll(false)
        
        if (e.target.scrollTopMax - e.target.scrollTop < 100)
            setAutoscroll(true)
        
    }

    return (
        
            <div className={s.messagesContainer}>
                <div className={s.usersWrap}>
                    {usersItems}
                </div>
                <div className={s.messagesWithInput}>
                    <div className={s.messagesWrap} onScroll={messagesScrollHandler}>
                    
                        {status === "error" && <div style={{color: "red", fontSize: "20px"}}>Some error</div>}
                        {messagesItems}
                        
                        <div ref={messagesAnchorRef}></div>
                    
                    </div>
                    <div className={s.messagesInputBlock}>
                        <div className={s.messageInput}>
                            <textarea value={messageText} autoFocus
                                onChange={onMessageTextChange}></textarea>
                        </div>
                        <div className={s.errorMessage}>{errorMessage}</div>
                        <button className={s.sendMessage} onClick={onsendMessage}
                            disabled={status !== "ready"} >
                            Send message
                        </button>
                    </div>
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
            <div>{props.userName}</div>
            <div className={s.message + " " + (props.isMe && s.myMessage)}>
                <span>{props.message}</span>
            </div>
            
        </div>
        
    )
})

export default Dialogs


