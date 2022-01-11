
import { getAuthData } from "./auth-reducer"
import { appType } from "./store"

const INITIALIZE_SUCCESS = 'Viktor-gif/app/INITIALIZE_SUCCESS'

const initialState = {
    initialized: false
}

export const appReducer = (state: appType = initialState, action: any) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default: return state
    }
}

export const initializeSuccess = () => ({type: INITIALIZE_SUCCESS})

// redux-thunk
export const initialize = () => (dispatch: any) => {
    dispatch(getAuthData()).then(() => {
        dispatch(initializeSuccess())
    })
    
}