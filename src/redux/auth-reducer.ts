import { authAPI } from "../api/api"
import { authType } from "./store"

const SET_AUTH_DATA = 'SET_AUTH_DATA'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessage: '',
}

export const authReducer = (state: authType = initialState, action: any) => {
    switch (action.type) {
        
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }
        default: return state
    }
}

export const setAuthData = (data: authDataType, isAuth: boolean) => {
    return {type: SET_AUTH_DATA, data, isAuth}
}
export const setErrorMessage = ( message: string) => {
    return {type: SET_ERROR_MESSAGE, message}
}

// redux-thunk
export const getAuthData = () => (dispatch: any) => {
    return authAPI.getAuthData().then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setAuthData(response.data.data, true))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    // console.log(formik)
    // return
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            console.log(response)
            dispatch(getAuthData())
            dispatch(setErrorMessage(''))
        } else {
            console.log(response)
            dispatch (setErrorMessage(response.data.messages[0]))
        }
    })
}
export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthData({id: null, email: null, login: null}, false))
        }
    })
}


export type authDataType = {
    id: number | null
    email: string | null
    login: string | null
}