import React from "react";
import { stateType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../HOC/WithAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: () => dispatch(dialogsPageActions.addMessage()),
        updateMessageText: (text: string) => dispatch(dialogsPageActions.updateMessageText(text))
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

// export const DialogsWrap = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

