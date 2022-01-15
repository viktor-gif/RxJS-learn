import { authAPI } from "../api/api"
import { authType } from "./store"

const SET_AUTH_DATA = 'Viktor-gif/auth/SET_AUTH_DATA'
const SET_ERROR_MESSAGE = 'Viktor-gif/auth/SET_ERROR_MESSAGE'
const SET_CAPTCHA_URL = 'Viktor-gif/auth/SET_CAPTCHA_URL'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
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
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
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
export const setCaptchaUrl = (captchaUrl: string | null) => {
    return {type: SET_CAPTCHA_URL, captchaUrl}
}

// redux-thunk
export const getAuthData = () => (dispatch: any) => {
    return authAPI.getAuthData().then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setAuthData(response.data.data, true))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => (dispatch: any) => {
    
    authAPI.login(email, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === 0) {
            console.log(response)
            dispatch(getAuthData())
            dispatch(setErrorMessage(''))
            dispatch(setCaptchaUrl(null))
        } else if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
            dispatch (setErrorMessage(response.data.messages[0]))
        } else {
            dispatch (setErrorMessage(response.data.messages[0]))
        }
    })
}
export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthData({id: null, email: null, login: null}, false))
            dispatch(setCaptchaUrl(null))
        }
    })
}
export const getCaptchaUrl = () => (dispatch: any) => {
    authAPI.getCaptchaUrl().then(response => {
        console.log(response.data.url)
        dispatch(setCaptchaUrl(response.data.url))
    })
}


export type authDataType = {
    id: number | null
    email: string | null
    login: string | null
}