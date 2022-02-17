import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { appStateType, inferActionsTypes } from "./redux-store"
import { usersType, userType } from "./store"

const FOLLOW_UNFOLLOW = 'Viktor-gif/users/FOLLOW_UNFOLLOW'
const SET_USERS = 'Viktor-gif/users/SET_USERS'
const SET_USERS_COUNT = 'Viktor-gif/users/SET_USERS_COUNT'
const SET_PROGRESS = 'Viktor-gif/users/SET_PROGRESS'
const SET_FOLLOWING_PROGRESS = 'Viktor-gif/users/SET_FOLLOWING_PROGRESS'
const SET_PAGE_SIZE = 'Viktor-gif/users/SET_PAGE_SIZE'
const SET_CURRENT_PAGE = 'Viktor-gif/users/SET_CURRENT_PAGE'
const SET_TERM = 'Viktor-gif/users/SET_TERM'
const SET_IS_FRIEND = 'Viktor-gif/users/SET_IS_FRIEND'

type initialStateType = typeof initialState

const initialState = {
    users: null as Array<userType> | null,
    usersCount: null as number | null,
    pageSize: 10,
    currentPage: 1,
    term: '',
    isFriend: false,
    inProgress: false,
    followingInProgress: false,
    followingInProgressUsersId: [] as Array<number>,
}

export const usersReducer = (state: initialStateType = initialState, action: actionsTypes): initialStateType => {
   
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users ? state.users.map(u => {
                    if (u.id === action.userId) {
                        if (u.followed === false) {
                            return {...u, followed: true}
                        } else {
                            return {...u, followed: false}
                        }
                    }
                    return u
                }) : null
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
            case SET_FOLLOWING_PROGRESS:
                return {...state,
                    //@ts-ignore
                    followingInProgressUsersId: action.isProgress 
                    ?
                    [...state.followingInProgressUsersId, action.userId]
                    : 
                    state.followingInProgressUsersId.filter(item => item !== action.userId),

                    followingInProgress: action.isProgress
                }
            case SET_PAGE_SIZE:
                return {
                    ...state,
                    pageSize: action.size
                }
            case SET_CURRENT_PAGE:
                return {
                    ...state,
                    currentPage: action.page
                }
            case SET_TERM:
                return {
                    ...state,
                    term: action.term
                }
            case SET_IS_FRIEND:
                return {
                    ...state,
                    isFriend: action.isFriend
                }
        default: return state
    }
}

type actionsTypes = inferActionsTypes<typeof usersActions>

// action-creators
export const usersActions = {
    followUnfollow: (userId: number) => ({type: FOLLOW_UNFOLLOW, userId} as const),
    setUsers: (users: usersType) => ({type: SET_USERS, users} as const),
    setUsersCount: (usersCount: number) => ({type: SET_USERS_COUNT, usersCount} as const),
    setProgress: (isProgress: boolean) => ({type: SET_PROGRESS, isProgress} as const),
    setFollowingProgress: (userId: number | null, isProgress: boolean) => ({type: SET_FOLLOWING_PROGRESS, userId, isProgress} as const),
    setPageSize: (size: number) => ({type: SET_PAGE_SIZE, size} as const),
    setCurrentPage: (page: number) => ({type: SET_CURRENT_PAGE, page} as const),
    setTerm: (term: string) => ({type: SET_TERM, term} as const),
    setIsFriend: (isFriend: boolean) => ({type: SET_IS_FRIEND, isFriend} as const),
}


// thunk-creators
type dispatchType = Dispatch<actionsTypes>
type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>

export const getUsers = (pageSize: number, pageNumber: number, term: string, isFriend: boolean) => 
    (dispatch: dispatchType) => {
    
    dispatch(usersActions.setCurrentPage(pageNumber))
    dispatch(usersActions.setTerm(term))
    dispatch(usersActions.setIsFriend(isFriend))
    dispatch(usersActions.setProgress(true))
    usersAPI.getUsers(pageSize, pageNumber, term, isFriend).then(response => {
        dispatch(usersActions.setUsersCount(response.data.totalCount))
        dispatch(usersActions.setUsers(response.data.items))
        dispatch(usersActions.setProgress(false))
    })
}
export const followPost = (userId: number) => (dispatch: dispatchType) => {
    dispatch(usersActions.setFollowingProgress(userId, true))
    usersAPI.followPost(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(usersActions.followUnfollow(userId))
                dispatch(usersActions.setFollowingProgress(userId, false))
            }
        })
}
export const followDelete = (userId: number): thunkType => 
(dispatch) => {
    dispatch(usersActions.setFollowingProgress(userId, true))
    usersAPI.followDelete(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(usersActions.followUnfollow(userId))
                dispatch(usersActions.setFollowingProgress(userId, false))
            }
        })
}