import React, { Suspense } from "react";
import { dialogsType, stateType } from "../../../redux/store";
import { getDialogMessages, getDialogs, deleteMessage } from "../../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../HOC/WithAuthRedirect";
import { compose } from "redux";
import { statusType } from "../../../api/chat-api";
import { chatMessageType } from "./messages/Messages";
import { dialogMessageType } from "../../../api/dialogs-api";

const Chat = React.lazy(() => import("./Chat"))

type propsType = {
    dialogs: dialogsType
    ownerId: number
    chatMessages: chatMessageType[] | null
    chatStatus: statusType
    dialogMessages: dialogMessageType[] | null
    currentDialogId: number

    getDialogs: () => void
    getDialogMessages: (dialogId: number) => void
    deleteMessage: (id: number | string, dialogId: number) => void
}

const ChatsWrap = (props: propsType) => {
    return <div>
        <Suspense fallback={<div>Loading...</div>}>
            <Chat dialogs={props.dialogs} ownerId={props.ownerId}
                getDialogs={props.getDialogs} getDialogMessages={props.getDialogMessages}
                chatMessages={props.chatMessages} chatStatus={props.chatStatus}
                dialogMessages={props.dialogMessages} currentDialogId={props.currentDialogId}
                deleteMessage={props.deleteMessage} />
        </Suspense>
        
    </div>
}

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        ownerId: state.profilePage.profileInfo?.userId,
        chatMessages: state.chat.messages,
        chatStatus: state.chat.status,
        dialogMessages: state.dialogsPage.dialogMessages,
        currentDialogId: state.dialogsPage.currentDialogId,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDialogs: () => dispatch(getDialogs()),
        getDialogMessages: (dialogId: number) => dispatch(getDialogMessages(dialogId)),
        deleteMessage: (id: number | string, dialogId: number) => dispatch(deleteMessage(id, dialogId)),
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatsWrap)

// export const DialogsWrap = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

