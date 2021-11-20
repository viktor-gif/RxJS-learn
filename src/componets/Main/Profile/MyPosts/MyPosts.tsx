import React from "react";
import { postsType } from "../../../../redux/store";
import s from "./MyPosts.module.css";
import ava from "../../../../img/ava_male.jpeg";


type myPostsPropsType = {
    posts: postsType
    dispatch: any
    postText: string
}
type postPropsType = {
    id: number
    key: number
    postText: string
    likesCount: number
}

export const MyPosts = (props: myPostsPropsType) => {
    const postsItems = props.posts.map(p => {
        return <Post id={p.id} key={p.id} 
                postText={p.postText} likesCount={p.likesCount} />
    })

    const textareaInput: React.RefObject<HTMLTextAreaElement> = React.createRef();

    const addPost = () => {
        if (textareaInput.current) {
            props.dispatch({
                type: "ADD_POST",
                postText: textareaInput.current.value
            });
            textareaInput.current.value = "";
        }
    }

    const changePostText = () => {
        if (textareaInput.current) {
            props.dispatch({
                type: "UPDATE_POST_TEXT",
                text: textareaInput.current.value
            });
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
                <button onClick={addPost} className={s.submitBtn}>Submit</button>
            {/* </form> */}
            {postsItems}
        </div>
    )
}

export const Post = (props: postPropsType) => {
    return (
        <div className={s.post}>
            <div className={s.postAva}>
                <img src={ava} alt="My_ava" />
            </div>
            <div className={s.postText}>{props.postText}</div>
            <div className={s.likes}><span>Likes</span>: {props.likesCount}</div>
        </div>
    )
}