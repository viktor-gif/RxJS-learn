import { usersAPI } from "../api/api";
import { asideType, usersType } from "./store";

const SET_FRIENDS = 'Viktor-gif/aside/SET_FRIENDS'
const SET_FRIENDS_COUNT = 'Viktor-gif/aside/SET_FRIENDS_COUNT'

const initialState = {
    friends: null,
    totalFriendsCount: 0
}

export const asideReducer = (state: asideType = initialState, action: any) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
        case SET_FRIENDS_COUNT:
            return {
                ...state,
                totalFriendsCount: action.count
            }
        default: return state
    }
}

export const setFriends = (friends: usersType) => ({
    type: SET_FRIENDS, friends
})
export const setFriendsCount = (count: number) => ({
    type: SET_FRIENDS_COUNT, count
})

// thunk-creators
export const getFriends = () => (dispatch: any) => {
        usersAPI.getUsers(100, 1, '', true).then(response => {
            dispatch(setFriends(response.data.items))
            dispatch(setFriendsCount(response.data.totalCount))
    })
}
