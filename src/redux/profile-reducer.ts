import { profilePageType } from "./store";

const ADD_POST = "ADD_POST"
const UPDATE_POST_TEXT = "UPDATE_POST_TEXT"

export const profileReducer = (state: profilePageType, action: any) => {
    switch (action.type){
        case ADD_POST:
            let posts = state.posts;
                posts.push({
                id: posts[posts.length - 1].id + 1,
                postText: state.postText,
                likesCount: Math.ceil(Math.random() * 100),
                avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"
            })
            state.postText = "";
            return state
        case UPDATE_POST_TEXT:
            state.postText = action.text;
            return state
        default: return state;
        
    }
}

export const profilePageActions = {
    addPost: () => ({type: ADD_POST}),
    updatePostText: (text: string) => ({type: UPDATE_POST_TEXT, text})
}

