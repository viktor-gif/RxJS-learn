
import { Dispatch } from "redux"
import { authAPI, profileAPI, resultCodeEnum, resultCodeForCaptchaEnum } from "../api/api"
import { setErrorText, setRejectedApp } from "./app-reducer"
import { authType, profileInfoType } from "./store"

const SET_AUTH_DATA = 'Viktor-gif/auth/SET_AUTH_DATA'
const SET_ERROR_MESSAGE = 'Viktor-gif/auth/SET_ERROR_MESSAGE'
const SET_CAPTCHA_URL = 'Viktor-gif/auth/SET_CAPTCHA_URL'
const SET_OWNER_PROFILE_INFO = 'Viktor-gif/auth/SET_OWNER_PROFILE_INFO'
const SET_LOGIN_SUCCESS = 'Viktor-gif/auth/SET_LOGIN_SUCCESS'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    ownerProfileInfo: null,
    errorMessage: '',
    loginSuccess: false
}

export const authReducer = (state: authType = initialState, action: any): authType => {
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
        case SET_OWNER_PROFILE_INFO:
            return {
                ...state,
                ownerProfileInfo: action.profileInfo
            }
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: action.success
            }
        default: return state
    }
}

type setAuthDataType = {type: typeof SET_AUTH_DATA, isAuth: boolean, data: authDataType}
export const setAuthData = (data: authDataType, isAuth: boolean): setAuthDataType => {
    return {type: SET_AUTH_DATA, data, isAuth}
}
export const setErrorMessage = ( message: string) => {
    return {type: SET_ERROR_MESSAGE, message}
}
export const setCaptchaUrl = (captchaUrl: string | null) => {
    return {type: SET_CAPTCHA_URL, captchaUrl}
}
export const setOwnerProfileInfo = (profileInfo: profileInfoType) => {
    return {type: SET_OWNER_PROFILE_INFO, profileInfo}
}
export const setLoginSuccess = (success: boolean) => {
    return {type: SET_LOGIN_SUCCESS, success}
}

// redux-thunk
export const getAuthData = () => (dispatch: any) => {
    return authAPI.getAuthData().then(response => {
        if (response.data.resultCode === resultCodeEnum.Success) {
          dispatch(setAuthData(response.data.data, true))
        }
    })
    .catch(err => {
        dispatch(setErrorText(err.message))
        dispatch(setRejectedApp(true))
    })
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => (dispatch: any) => {
    dispatch(setLoginSuccess(true))
    
    authAPI.login(email, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === resultCodeEnum.Success) {
            console.log(response)
            dispatch(getAuthData())
            dispatch(setErrorMessage(''))
            dispatch(setCaptchaUrl(null))
            dispatch(setLoginSuccess(false))
        } else if (response.data.resultCode === resultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
            dispatch (setErrorMessage(response.data.messages[0]))
            dispatch(setLoginSuccess(false))
        } else {
            dispatch (setErrorMessage(response.data.messages[0]))
            dispatch(setLoginSuccess(false))
        }
    })
    .catch(err => {
        dispatch(setLoginSuccess(false))
        dispatch(setErrorText(err.message))
        dispatch(setRejectedApp(true))
    })
    
}
export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthData({id: null, email: null, login: null}, false))
            dispatch(setCaptchaUrl(null))
        }
    })
    .catch(err => {
        dispatch(setErrorText(err.message))
        dispatch(setRejectedApp(true))
    })
}
export const getCaptchaUrl = () => (dispatch: any) => {
    authAPI.getCaptchaUrl().then(response => {
        console.log(response.data.url)
        dispatch(setCaptchaUrl(response.data.url))
    })
    .catch(err => {
        dispatch(setErrorText(err.message))
        dispatch(setRejectedApp(true))
    })
}
export const getOwnerProfileInfo = (ownerId: number) => (dispatch: Dispatch) => {
    profileAPI.getProfileData(ownerId).then(response => {
        dispatch(setOwnerProfileInfo(response.data))
    })
    .catch(err => {
        dispatch(setErrorText(err.message))
        dispatch(setRejectedApp(true))
    })
}


export type authDataType = {
    id: number | null
    email: string | null
    login: string | null
}