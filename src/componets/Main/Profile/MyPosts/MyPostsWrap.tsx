import React from "react";
import { profilePageType } from "../../../../redux/store";
import { profilePageActions } from "../../../../redux/profile-reducer";
import { MyPosts } from "./MyPosts";


type myPostsPropsType = {
    profilePage: profilePageType
    dispatch: any
}

export const MyPostsWrap = (props: myPostsPropsType) => {

    const addPost = () => {
        props.dispatch(profilePageActions.addPost());
    }

    const updatePostText = (text: string) => {
        props.dispatch(profilePageActions.updatePostText(text));
    }

    return (
        <MyPosts dispatch={props.dispatch}
                posts={props.profilePage.posts}
                postText={props.profilePage.postText}
                addPost={addPost}
                updatePostText={updatePostText} />
    )
}
