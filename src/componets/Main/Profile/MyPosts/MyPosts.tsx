import React, { ChangeEvent } from "react";
import { postsType } from "../../../../redux/store";
import s from "./MyPosts.module.css";
import ava from "../../../../img/ava_male.jpeg";
import { Button } from "../../../common/buttons/Button";
import { Textarea } from "../../../common/textarea/Textarea";


type myPostsPropsType = {
    posts: postsType
    postText: string
    addPost: () => void
    updatePostText: (text: string) => void
}
type postPropsType = {
    id: number
    key: number
    postText: string
    likesCount: number
}

export const MyPosts = React.memo((props: myPostsPropsType) => {
    console.log('renderM my posts')
    const postsItems = props.posts.map(p => {
        return <Post id={p.id} key={p.id} 
                postText={p.postText} likesCount={p.likesCount} />
    })

    const textareaInput: React.RefObject<HTMLTextAreaElement> = React.createRef();

    const addPost = () => {
        props.addPost();
    }

    const changePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostText(e.currentTarget.value);
    }

    return (
        <div className={s.postsWrap}>
            <h3 className={s.postsTitle}>My posts</h3>
            {/* <form className={s.postsForm}> */}
                <div className={s.postsFormInput}>
                    <Textarea value={props.postText}
                            onChange={changePostText}
                            placeholder="Your post-text" />

                </div>
                <Button click={addPost} buttonType="addPost" value="Submit" />
            {/* </form> */}
            <div className={s.postsItems}>
                {postsItems}
            </div>
        </div>
    )
})

export const Post = React.memo((props: postPropsType) => {
    return (
        <div className={s.post}>
            <div className={s.postAva}>
                <img src={ava} alt="My_ava" />
            </div>
            <div className={s.postText}>{props.postText}</div>
            <div className={s.likes}><span>Likes</span>: {props.likesCount}</div>
        </div>
    )
})