import { Dispatch } from "redux";
import { dialogsAPI } from "../api/dialogs-api";
import { dialogsPageType, dialogsType } from "./store";


const SET_DIALOGS = "Viktor-gif/dialogs/SET_DIALOGS"
const SET_DIALOG_MESSAGES = "Viktor-gif/dialogs/SET_DIALOG_MESSAGES"

const initialState = {
    dialogMessages: null,
    dialogs: null
}

export const dialogsReducer = (state: dialogsPageType = initialState, action: any) => {
    
    switch (action.type) {
        case SET_DIALOGS:
            return {
                ...state,
                dialogs: action.dialogs
            }
        case SET_DIALOG_MESSAGES:
            return {
                ...state,
                dialogMessages: [...action.messages]
                .filter((m, index, array) => index >= array.length - 100 )
            }
        default: return state
    }
}

// actions
export const dialogsPageActions = {
    setDialogs: (dialogs: dialogsType) => ({type: SET_DIALOGS, dialogs}),
    setDialogMessages: (messages: dialogsType) => ({type: SET_DIALOG_MESSAGES, messages}),
}

// thunks
export const getDialogs = () => (dispatch: Dispatch) => {
    dialogsAPI.getDialogs().then(response => {
        dispatch(dialogsPageActions.setDialogs(response.data))
    })
}
export const getDialogMessages = (dialogId: number) => (dispatch: Dispatch) => {
    dialogsAPI.getDialogMessages(dialogId).then(response => {
        dispatch(dialogsPageActions.setDialogMessages(response.data.items))
    })
}
