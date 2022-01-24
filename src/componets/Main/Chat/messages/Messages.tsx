import React, { useEffect, useRef, useState } from "react";
import s from "./Messages.module.css";
import { useDispatch } from "react-redux";
import { startMessagesListening, stopMessagesListening } from "../../../../redux/chat-reducer";
import { Preloader } from "../../../common/preloader/preloader";
import { chatMessageAPIType, statusType } from "../../../../api/chat-api";
import { Message } from "./Message";
import { MessagesForm } from "./MessagesForm";
import { dialogMessageType } from "../../../../api/dialogs-api";
import avaMale from "../../../../img/ava_male.jpeg";

type propsType = {
    ownerId: number
    status: statusType
    chatMessages: chatMessageType[] | null
    dialogMessages: dialogMessageType[] | null
}

export type chatMessageType = chatMessageAPIType & {id: string}


export const Messages = React.memo((props: propsType) => {
    
    const [isAutoscroll, setAutoscroll] = useState(true)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        isAutoscroll && messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }, [props.chatMessages, props.dialogMessages])



    const chatMessagesItems = props.chatMessages?.map((m) => {
        return <Message userId={m.userId} key={m.id} isMe={m.userId === props.ownerId} message={m.message} ava={m.photo} userName={m.userName} />
    })
    const dialogMessagesItems = props.dialogMessages?.map((m) => {
        return <Message userId={m.id} key={m.id.toString()} isMe={m.senderId === props.ownerId || m.recipientId === props.ownerId}
            message={m.body} ava={avaMale} userName={m.senderName} />
    })

    // if (props.messages && props.messages.length < 1) {
    //     return <Preloader />
    // }

    if (props.status && props.status === "error") {
        console.log("Error Chat")
    }

    const messagesScrollHandler = (e: any) => {
        setAutoscroll(false)
        
        if (e.target.scrollTopMax - e.target.scrollTop < 100)
            setAutoscroll(true)
        
    }

    return (
        
        
        <div className={s.messagesWithInput}>
            <div className={s.messagesWrap} onScroll={messagesScrollHandler}>
            
                {(props.status && props.status) === "error" && <div style={{color: "red", fontSize: "20px"}}>Some error</div>}
                {chatMessagesItems || dialogMessagesItems}
                
                <div ref={messagesAnchorRef}></div>
            
            </div>
            <MessagesForm status={props.status} />
        </div>
            
    )
})



