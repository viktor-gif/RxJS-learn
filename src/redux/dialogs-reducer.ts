import { Dispatch } from "redux";
import { dialogsAPI } from "../api/dialogs-api";
import { dialogsPageType, dialogsType } from "./store";


const SET_DIALOGS = "Viktor-gif/dialogs/SET_DIALOGS"
const SET_DIALOG_MESSAGES = "Viktor-gif/dialogs/SET_DIALOG_MESSAGES"
const CLEAN_DIALOG_MESSAGES = "Viktor-gif/dialogs/CLEAN_DIALOG_MESSAGES"
const SET_DIALOG_ID = "Viktor-gif/dialogs/SET_DIALOG_ID"

const initialState = {
    dialogMessages: null,
    dialogs: null,
    currentDialogId: null
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
        case CLEAN_DIALOG_MESSAGES:
            return {
                ...state,
                dialogMessages: null
            }
        case SET_DIALOG_ID:
            return {
                ...state,
                currentDialogId: action.id
            }
        default: return state
    }
}

// actions
export const dialogsPageActions = {
    setDialogs: (dialogs: dialogsType) => ({type: SET_DIALOGS, dialogs}),
    setDialogMessages: (messages: dialogsType) => ({type: SET_DIALOG_MESSAGES, messages}),
    cleanDialogMessages: () => ({type: CLEAN_DIALOG_MESSAGES}),
    setDialogId: (id: number) => ({type: SET_DIALOG_ID, id}),
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
export const sendDialogMessage = (text: string, dialogId: number) => (dispatch: any) => {
    dialogsAPI.sendDialogMessage(text, dialogId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getDialogMessages(dialogId))
        }
    })
}
export const updateOrAddDialog = (userId: number) => (dispatch: any) => {
    dialogsAPI.updateOrAddDialog(userId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getDialogs())
        }
    })
}
export const deleteMessage = (id: number | string, dialogId: number) => (dispatch: any) => {
    dialogsAPI.deleteMessage(id).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getDialogMessages(dialogId))
        }
    })
}
