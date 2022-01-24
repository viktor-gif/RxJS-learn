import React, { useState } from "react";
import s from "./Messages.module.css";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../../redux/chat-reducer";
import { statusType } from "../../../../api/chat-api";

type propsType = {
    status: statusType
}

export const MessagesForm = React.memo((props: propsType) => {
    
    const [messageText, setMessageText] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const dispatch = useDispatch()
    

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

    return (
        <div className={s.messagesForm}>
            <div className={s.messageInput}>
                <textarea value={messageText} autoFocus
                    onChange={onMessageTextChange}></textarea>
            </div>
            <div className={s.errorMessage}>{errorMessage}</div>
            <button className={s.sendMessage} onClick={onsendMessage}
                disabled={props.status !== "ready"} >
                Send message
            </button>
        </div>
    )
})



