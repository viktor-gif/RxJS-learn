import React, { useEffect, useRef, useState } from "react";
import s from "./Messages.module.css";
import { chatMessageAPIType, statusType } from "../../../../api/chat-api";
import { Message } from "./Message";
import { MessagesForm } from "./MessagesForm";
import { dialogMessageType, dialogsAPI } from "../../../../api/dialogs-api";
import avaMale from "../../../../img/ava_male.jpeg";

type propsType = {
    ownerId: number
    status: statusType
    chatMessages: chatMessageType[] | null
    dialogMessages: dialogMessageType[] | null
    currentDialogId: number

    deleteMessage: (id: number | string, dialogId: number) => void
}

export type chatMessageType = chatMessageAPIType & {id: string}


export const Messages = React.memo((props: propsType) => {
    
    const [isAutoscroll, setAutoscroll] = useState(true)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        isAutoscroll && messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }, [props.chatMessages, props.dialogMessages])

    const chatMessagesItems = props.chatMessages?.map((m) => {
        return <Message id={m.userId} key={m.id} isMe={m.userId === props.ownerId}
            message={m.message} ava={m.photo} userName={m.userName}
            messageType={"commonChat"} deleteMessage = {props.deleteMessage}
            senderId={1} recipientId={1} />
    })
    const dialogMessagesItems = props.dialogMessages?.map((m) => {
        return <Message id={m.id} key={m.id.toString()} isMe={m.senderId === props.ownerId}
            message={m.body} ava={avaMale} userName={m.senderName}
            messageType={"dialog"}deleteMessage = {props.deleteMessage}
            senderId={m.senderId} recipientId={m.recipientId} />
    })

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
            <MessagesForm currentDialogId={props.currentDialogId} chatMessages={props.chatMessages} status={props.status} />
        </div>
            
    )
})



