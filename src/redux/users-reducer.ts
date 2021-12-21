import { usersAPI } from "../api/api"
import { usersPageType, usersType } from "./store"

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const SET_PROGRESS = 'SET_PROGRESS'
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS'
const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TERM = 'SET_TERM'
const SET_IS_FRIEND = 'SET_IS_FRIEND'

const initialState = {
    users: null,
    usersCount: null,
    pageSize: 10,
    currentPage: 1,
    term: '',
    isFriend: false,
    inProgress: false,
    followingInProgress: false,
    followingInProgressUsersId: [],
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
            case SET_FOLLOWING_PROGRESS:
                return {...state,
                    followingInProgressUsersId: action.isProgress ?
                    [...state.followingInProgressUsersId, action.userId] :
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
                    pageNumber: action.page
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

// action-creators
export const followUnfollow = (userId: number) => ({type: FOLLOW_UNFOLLOW, userId})
export const setUsers = (users: usersType) => ({type: SET_USERS, users})
export const setUsersCount = (usersCount: number) => ({type: SET_USERS_COUNT, usersCount})
export const setProgress = (isProgress: boolean) => ({type: SET_PROGRESS, isProgress})
export const setFollowingProgress = (userId: number | null, isProgress: boolean) => ({type: SET_FOLLOWING_PROGRESS, userId, isProgress})
export const setPageSize = (size: number) => ({type: SET_PAGE_SIZE, size})
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, page})
export const setTerm = (term: string) => ({type: SET_TERM, term})
export const setIsFriend = (isFriend: boolean) => ({type: SET_IS_FRIEND, isFriend})

// thunk-creators
export const getUsers = (pageSize: number, pageNumber: number, term: string, isFriend: boolean) => (dispatch: any) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(setTerm(term))
    dispatch(setIsFriend(isFriend))
    dispatch(setProgress(true))
    usersAPI.getUsers(pageSize, pageNumber, term, isFriend).then(response => {
        dispatch(setUsersCount(response.data.totalCount))
        dispatch(setUsers(response.data.items))
        dispatch(setProgress(false))
    })
}
export const followPost = (userId: number) => (dispatch: any) => {
    dispatch(setFollowingProgress(userId, true))
    usersAPI.followPost(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followUnfollow(userId))
                dispatch(setFollowingProgress(userId, false))
            }
        })
}
export const followDelete = (userId: number) => (dispatch: any) => {
    dispatch(setFollowingProgress(userId, true))
    usersAPI.followDelete(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followUnfollow(userId))
                dispatch(setFollowingProgress(userId, false))
            }
        })
}