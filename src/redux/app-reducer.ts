
import { getAuthData } from "./auth-reducer"
import { appType } from "./store"

const INITIALIZE_SUCCESS = 'Viktor-gif/app/INITIALIZE_SUCCESS'
const SET_OPEN_CHAT = 'Viktor-gif/app/SET_OPEN_CHAT'
const SET_REJECTED_APP = 'Viktor-gif/app/SET_REJECTED_APP'
const SET_ERROR_TEXT = 'Viktor-gif/app/SET_ERROR_TEXT'

const initialState = {
    initialized: false,
    isOpendChat: false,
    rejectedApp: false,
    errorText: ''
}

export const appReducer = (state: appType = initialState, action: initializeSuccessType | setOpenChatType | setRejectedAppType | setErrorTextType): appType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case SET_OPEN_CHAT:
            return {
                ...state,
                isOpendChat: action.isOpened
            }
        case SET_REJECTED_APP:
            return {
                ...state,
                rejectedApp: action.rejected
            }
        case SET_ERROR_TEXT:
            return {
                ...state,
                errorText: action.text
            }
        default: return state
    }
}

type initializeSuccessType = {type: typeof INITIALIZE_SUCCESS}
export const initializeSuccess = (): initializeSuccessType => ({type: INITIALIZE_SUCCESS})

type setOpenChatType = {type: typeof SET_OPEN_CHAT, isOpened: boolean}
export const setOpenChat = (isOpened: boolean): setOpenChatType => ({type: SET_OPEN_CHAT, isOpened})

type setRejectedAppType = {type: typeof SET_REJECTED_APP, rejected: boolean}
export const setRejectedApp = (rejected: boolean): setRejectedAppType => ({type: SET_REJECTED_APP, rejected})

type setErrorTextType = {type: typeof SET_ERROR_TEXT, text: string}
export const setErrorText = (text: string): setErrorTextType => ({type: SET_ERROR_TEXT, text})

// redux-thunk
export const initialize = () => (dispatch: any) => {
    dispatch(getAuthData()).then(() => {
        dispatch(initializeSuccess())
    })
    .catch((err: any) => {
        console.log(err.message)
    })
}