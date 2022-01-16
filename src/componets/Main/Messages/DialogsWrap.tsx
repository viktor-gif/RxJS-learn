import React, { Suspense } from "react";
import { dialogsType, stateType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../HOC/WithAuthRedirect";
import { compose } from "redux";

const Dialogs = React.lazy(() => import("./Dialogs"))

type propsType = {
    dialogs: dialogsType
    newMessageText: string
    isAuth: boolean
    ownerId: number
    addMessage: () => void
    updateMessageText: (text: string) => void
}

const DialogsWrap = (props: propsType) => {
    return <div>
        <Suspense fallback={<div>Loading...</div>}>
            <Dialogs dialogs={props.dialogs} ownerId={props.ownerId}
                newMessageText={props.newMessageText} isAuth={props.isAuth}
                addMessage={props.addMessage} updateMessageText={props.updateMessageText} />
        </Suspense>
        
    </div>
}

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth,
        ownerId: state.profilePage.profileInfo?.userId
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
)(DialogsWrap)

// export const DialogsWrap = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

