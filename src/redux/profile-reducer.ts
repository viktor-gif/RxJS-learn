import { profileAPI } from "../api/api";
import { profileInfoType, profilePageType } from "./store";

const ADD_POST = "ADD_POST"
const UPDATE_POST_TEXT = "UPDATE_POST_TEXT"
const SET_STATUS = "SET_STATUS"
const SET_PROFILE_INFO = "SET_PROFILE_INFO"

const initialState = {
    posts: [
        {id: 1, postText: "Hello! how are you?", likesCount: 48, avaUrl: 
            "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
        {id: 2, postText: "This is my post.", likesCount: 23, avaUrl: 
            "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
        {id: 3, postText: "Never underastimate me!", likesCount: 8, avaUrl: 
            "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
        {id: 4, postText: "Bla-bla", likesCount: 129, avaUrl: 
            "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"}
    ],
    postText: "",
    status: null,
    profileInfo: null
}

export const profileReducer = (state: profilePageType = initialState, action: any) => {
    const posts = state.posts
    switch (action.type){
        case ADD_POST:
            const newPost = {
                id: posts[posts.length - 1].id + 1,
                postText: state.postText,
                likesCount: Math.ceil(Math.random() * 100),
                avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                postText: ''
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                postText: action.text
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.info
            }
        
        default: return state;
        
    }
}

export const profilePageActions = {
    addPost: () => ({type: ADD_POST}),
    updatePostText: (text: string) => ({type: UPDATE_POST_TEXT, text})
}
export const setProfileInfo = (info: profileInfoType) => ({type: SET_PROFILE_INFO, info})
export const setStatus = (status: string) => ({type: SET_STATUS, status})

// redux-thunk
export const getProfileData = (userId: number) => (dispatch: any) => {
    profileAPI.getProfileData(userId).then(response => {
        dispatch(setProfileInfo(response.data))
    })
}
export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}
    
