import React from "react";
import { dialogsPageType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import StoreContext from "../../../storeContext";

type dialogsPropsType = {}

export const DialogsWrap = (props: dialogsPropsType) => {

    return <StoreContext.Consumer> 
        { (store: any) => {

            const state = store.getState()

            const addMessage = () => {
                store.dispatch(dialogsPageActions.addMessage())
            }
        
            const updateMessageText = (text: string) => {
                    store.dispatch(dialogsPageActions.updateMessageText(text))
            }
        
            return <Dialogs addMessage={addMessage}
                            updateMessageText={updateMessageText}
                            dialogs={state.dialogsPage.dialogs}
                            messages={state.dialogsPage.messages}
                            newMessageText={state.dialogsPage.newMessageText} />
        
    }}
    </StoreContext.Consumer>
}

