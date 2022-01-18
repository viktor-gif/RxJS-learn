import React, { useEffect, useState } from "react";
import { dialogsType, stateType } from "../../../redux/store";
import s from "./Dialogs.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../../redux/chat-reducer";

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

export type chatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string | null
}


const Dialogs = React.memo((props: dialogsPropsType) => {
    const [messageText, setMessageText] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const dispatch = useDispatch()

    const messages = useSelector((state: stateType) => state.chat.messages)
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            stopMessagesListening()
        }
    }, [])

    const dialogs = props.dialogs;

    const usersItems = dialogs.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
    })

    const messagesItems = messages?.map((m, index) => {
        return <Message id={m.userId} key={index} isMe={m.userId === props.ownerId} message={m.message} ava={m.photo} userName={m.userName} />
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
        }
        
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
                <div className={s.errorMessage}>{errorMessage}</div>
                <button className={s.sendMessage} onClick={onsendMessage}
                    disabled={false} >
                    Send message
                </button>
            </div>
        </div>
    )
})


// const Dialogs = React.memo((props: dialogsPropsType) => {
//     const [messages, setMessages] = useState<messagesType[] | null>(null)
//     const [messageText, setMessageText] = useState('')
//     const [errorMessage, setErrorMessage] = useState<string | null>(null)
//     const [sendMessageState, setSendMessageState] = useState<'pending' | 'ready'>('pending')
//     const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    
//     useEffect(() => {
//         let ws: WebSocket | null = null
//         const closeHandler = () => {
//             console.log('CLOSE WS')
//             setSendMessageState('pending')
//             setTimeout(() => createChannel(), 3000)
//         }
//         function createChannel() {
//             ws?.removeEventListener('close', closeHandler)
//             ws?.close()
//             ws =  new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
//             ws.addEventListener('close', closeHandler)
//             setWsChannel(ws)
//         }
//         createChannel()
        
//         return () => {
//             ws?.removeEventListener('close', closeHandler)
//             ws?.close()
//             setWsChannel(null)
//         }
//     }, [])

//     useEffect(() => {
//         const messageHandler = (e: MessageEvent) => {
//             console.log(JSON.parse(e.data))
//             let newMessages = JSON.parse(e.data)
//             setMessages((prev) => prev ? [...prev, ...newMessages] : newMessages)
//         }
//         wsChannel?.addEventListener('message', messageHandler)

//         return () => {
//             wsChannel?.removeEventListener('message', messageHandler)
//         }
//     }, [wsChannel])

//     useEffect(() => {
//         const openHandler = () => {
//             setSendMessageState('ready')
//         }
//         wsChannel?.addEventListener('open', openHandler)

//         return () => {
//             wsChannel?.removeEventListener('open', openHandler)
//         }
//     }, [wsChannel])

//     const dialogs = props.dialogs;

//     const usersItems = dialogs.map(d => {
//         return <Dialog id={d.id} key={d.id} name={d.name} url={d.url} sex={d.sex} />
//     })

//     const messagesItems = messages?.map((m, index) => {
//         return <Message id={m.userId} key={index} isMe={m.userId === props.ownerId} message={m.message} ava={m.photo} userName={m.userName} />
//     })

//     const sendMessage = () => {
//         if (!messageText || messageText.length < 1) {
//             setErrorMessage("You can not send an empty message")
//             return
//         } else if (messageText.length >= 100) {
//             setErrorMessage("Max length is 100 symbols")
//             return
//         } else {
//             wsChannel?.send(messageText)
//             setMessageText('')
//             setErrorMessage(null)
//         }
        
//     }

//     const onMessageTextChange = (e: any) => {
//         setMessageText(e.target.value);
        
//     }

//     return (
//         <div className={s.messagesContainer}>
//             <div className={s.usersWrap}>
//                 {usersItems}
//             </div>
//             <div className={s.messagesWrap}>
//                 {messagesItems}
//                 <div className={s.messageInput}>
//                     <textarea value={messageText}
//                         onChange={onMessageTextChange}></textarea>
//                 </div>
//                 <div className={s.errorMessage}>{errorMessage}</div>
//                 <button className={s.sendMessage} onClick={sendMessage}
//                     disabled={wsChannel === null || sendMessageState === 'pending'} >
//                     Send message
//                 </button>
//             </div>
//         </div>
//     )
// })

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


