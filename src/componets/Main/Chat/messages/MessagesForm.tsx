import React, { useState } from "react";
import s from "./Messages.module.css";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../../redux/chat-reducer";
import { statusType } from "../../../../api/chat-api";
import { chatMessageType } from "./Messages";
import { sendDialogMessage } from "../../../../redux/dialogs-reducer";
import { Button } from "../../../common/buttons/Button";

type propsType = {
    status: statusType
    chatMessages: chatMessageType[] | null
    currentDialogId: number
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
            props.chatMessages 
                ? dispatch(sendMessage(messageText)) 
                : dispatch(sendDialogMessage(messageText, props.currentDialogId))
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
            <Button click={onsendMessage} value="Send message" buttonType="sendMessage"
                disabled={props.chatMessages ? props.status !== "ready" : false} />
        </div>
    )
})



