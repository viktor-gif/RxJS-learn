import { usersAPI } from "../api/api";
import { asideType, usersType } from "./store";

const SET_FRIENDS = 'SET_FRIENDS'

const initialState = {
    friends: null
}

export const asideReducer = (state: asideType = initialState, action: any) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
        default: return state
    }
}

export const setFriends = (friends: usersType) => ({
    type: SET_FRIENDS, friends
})

// thunk-creators
export const getFriends = () => (dispatch: any) => {
        usersAPI.getUsers(100, 1, '', true).then(response => {
            
            dispatch(setFriends(response.data.items))
    })
}
