import React from "react";
import { stateType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: () => dispatch(dialogsPageActions.addMessage()),
        updateMessageText: (text: string) => dispatch(dialogsPageActions.updateMessageText(text))
    }
}

export const DialogsWrap = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

