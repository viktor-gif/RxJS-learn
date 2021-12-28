import { authAPI } from "../api/api"
import { authType } from "./store"

const SET_AUTH_DATA = 'SET_AUTH_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: authType = initialState, action: any) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        default: return state
    }
}

export const setAuthData = (data: authDataType, isAuth: boolean) => {
    return {type: SET_AUTH_DATA, data, isAuth}
}

// redux-thunk
export const getAuthData = () => (dispatch: any) => {
    authAPI.getAuthData().then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setAuthData(response.data.data, true))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthData())
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