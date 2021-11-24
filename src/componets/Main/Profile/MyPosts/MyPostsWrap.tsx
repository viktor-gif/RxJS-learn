import React from "react";
import { profilePageType } from "../../../../redux/store";
import { profilePageActions } from "../../../../redux/profile-reducer";
import { MyPosts } from "./MyPosts";
import StoreContext from "../../../../storeContext";


type myPostsPropsType = {}

export const MyPostsWrap = (props: myPostsPropsType) => {

    return <StoreContext.Consumer> 
        {(store: any) => {

            const state = store.getState()
        
            const addPost = () => {
                store.dispatch(profilePageActions.addPost());
            }
        
            const updatePostText = (text: string) => {
                store.dispatch(profilePageActions.updatePostText(text));
            }
        
            return (
                <MyPosts dispatch={store.dispatch}
                        posts={state.profilePage.posts}
                        postText={state.profilePage.postText}
                        addPost={addPost}
                        updatePostText={updatePostText} />
            )
        }}
    </StoreContext.Consumer>
}
