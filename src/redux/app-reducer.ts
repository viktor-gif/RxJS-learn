
import { getAuthData } from "./auth-reducer"
import { appType } from "./store"

const INITIALIZE_SUCCESS = 'Viktor-gif/app/INITIALIZE_SUCCESS'
const SET_OPEN_CHAT = 'Viktor-gif/app/SET_OPEN_CHAT'

const initialState = {
    initialized: false,
    isOpendChat: false
}

export const appReducer = (state: appType = initialState, action: any) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_OPEN_CHAT:
            return {
                ...state,
                isOpendChat: action.isOpened
            }
        default: return state
    }
}

export const initializeSuccess = () => ({type: INITIALIZE_SUCCESS})
export const setOpenChat = (isOpened: boolean) => ({type: SET_OPEN_CHAT, isOpened})

// redux-thunk
export const initialize = () => (dispatch: any) => {
    dispatch(getAuthData()).then(() => {
        dispatch(initializeSuccess())
    })
    
}