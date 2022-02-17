import React from "react";
import { postsType } from "../../../../redux/store";
import s from "./MyPosts.module.css";
import ava from "../../../../img/ava_male.jpeg";
import { Button } from "../../../common/buttons/Button";


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

    const changePostText = () => {
        if (textareaInput.current) {
            props.updatePostText(textareaInput.current.value);
        }
    }

    return (
        <div className={s.postsWrap}>
            <h3 className={s.postsTitle}>My posts</h3>
            {/* <form className={s.postsForm}> */}
                <div className={s.postsFormInput}>
                    <textarea value={props.postText}
                            onChange={changePostText} 
                            ref={textareaInput} name="addPost" 
                            id="addPost"></textarea>

                </div>
                <Button click={addPost} buttonType="addPost" value="Submit" />
            {/* </form> */}
            {postsItems}
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