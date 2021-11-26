import { usersPageType, usersType } from "./store"

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW'
const SET_USERS = 'SET_USERS'

const initialState = {
    users: null
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
        default: return state
    }
}

export const usersPageActions = {
    followUnfollow: (userId: number) => ({type: FOLLOW_UNFOLLOW, userId}),
    setUsers: (users: usersType) => ({type: SET_USERS, users})
}
