
import { getAuthData } from "./auth-reducer"
import { appType } from "./store"

const INITIALIZE_SUCCESS = 'Viktor-gif/app/INITIALIZE_SUCCESS'
const SET_OPEN_CHAT = 'Viktor-gif/app/SET_OPEN_CHAT'

const initialState = {
    initialized: false,
    isOpendChat: false
}

export const appReducer = (state: appType = initialState, action: initializeSuccessType | setOpenChatType): appType => {
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
        default: return state
    }
}

type initializeSuccessType = {type: typeof INITIALIZE_SUCCESS}
export const initializeSuccess = (): initializeSuccessType => ({type: INITIALIZE_SUCCESS})

type setOpenChatType = {type: typeof SET_OPEN_CHAT, isOpened: boolean}
export const setOpenChat = (isOpened: boolean): setOpenChatType => ({type: SET_OPEN_CHAT, isOpened})

// redux-thunk
export const initialize = () => (dispatch: any) => {
    dispatch(getAuthData()).then(() => {
        dispatch(initializeSuccess())
    })
    
}