import { usersPageType, usersType } from "./store"

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const SET_PROGRESS = 'SET_PROGRESS'

const initialState = {
    users: null,
    usersCount: null,
    pageSize: 10,
    inProgress: false
}

export const usersReducer = (state: usersPageType = initialState, action: any) => {
   
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users?.map(u => {
                    if (u.id === action.userId) {
                        if (u.followed === false) {
                            return {...u, followed: true}
                        } else {
                            return {...u, followed: false}
                        }
                    }
                    return u
                })
            }
            case SET_USERS_COUNT:
                return {
                    ...state,
                    usersCount: action.usersCount
                }
            case SET_PROGRESS:
                return {
                    ...state,
                    inProgress: action.isProgress
                }
        default: return state
    }
}

    export const followUnfollow = (userId: number) => ({type: FOLLOW_UNFOLLOW, userId})
    export const setUsers = (users: usersType) => ({type: SET_USERS, users})
    export const setUsersCount = (usersCount: number) => ({type: SET_USERS_COUNT, usersCount})
    export const setProgress = (isProgress: boolean) => ({type: SET_PROGRESS, isProgress})
