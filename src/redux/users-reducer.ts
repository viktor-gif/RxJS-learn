import { usersPageType, usersType } from "./store"

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

const initialState = {
    users: null,
    totalUsersCount: null,
    pageSize: 10
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
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        default: return state
    }
}

export const usersPageActions = {
    followUnfollow: (userId: number) => ({type: FOLLOW_UNFOLLOW, userId}),
    setUsers: (users: usersType) => ({type: SET_USERS, users}),
    setTotalUsersCount: (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, usersCount})
}
