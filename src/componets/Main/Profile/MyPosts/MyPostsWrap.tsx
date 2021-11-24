import React from "react";
import { stateType } from "../../../../redux/store";
import { profilePageActions } from "../../../../redux/profile-reducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state: stateType) => {
    return {
        posts: state.profilePage.posts,
        postText: state.profilePage.postText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => dispatch(profilePageActions.addPost()),
        updatePostText: (text: string) => dispatch(profilePageActions.updatePostText(text))
    }
}

export const MyPostsWrap = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
