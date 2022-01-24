import React from "react";
import { dialogsType } from "../../../redux/store";
import s from "./Chat.module.css";
import { chatMessageAPIType, statusType } from "../../../api/chat-api";
import Dialogs from "./Dialogs/Dialogs";
import { Messages } from "./messages/Messages";
import { dialogMessageType } from "../../../api/dialogs-api";

type propsType = {
    dialogs: dialogsType
    ownerId: number
    chatMessages: chatMessageType[] | null
    chatStatus: statusType
    dialogMessages: dialogMessageType[] | null
    currentDialogId: number

    getDialogs: () => void
    getDialogMessages: (dialogId: number) => void
}

export type chatMessageType = chatMessageAPIType & {id: string}

const Chat = React.memo((props: propsType) => {

    return (
        
        <div className={s.chatContainer}>
            <Dialogs dialogs={props.dialogs} getDialogs={props.getDialogs} getDialogMessages={props.getDialogMessages} />
            <Messages chatMessages={props.chatMessages} dialogMessages={props.dialogMessages} status={props.chatStatus}
                ownerId={props.ownerId} currentDialogId={props.currentDialogId} />
            
            {/* <Route path="chat" render={() => <Messages messages={props.chatMessages} status={props.chatStatus}
                ownerId={props.ownerId} />} /> */}
        </div>
            
    )
})

export default Chat


