import React from "react";
import { dialogsPageType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";

type dialogsPropsType = {
    dialogsPage: dialogsPageType
    dispatch: any
}

export const DialogsWrap = (props: dialogsPropsType) => {

    const addMessage = () => {
        props.dispatch(dialogsPageActions.addMessage())
    }

    const updateMessageText = (text: string) => {
            props.dispatch(dialogsPageActions.updateMessageText(text))
    }

    return <Dialogs addMessage={addMessage}
                    updateMessageText={updateMessageText}
                    dialogs={props.dialogsPage.dialogs}
                    messages={props.dialogsPage.messages}
                    newMessageText={props.dialogsPage.newMessageText} />
}

