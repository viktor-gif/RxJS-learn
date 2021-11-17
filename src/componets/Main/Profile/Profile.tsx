import React from "react";
import { postsType, profilePageType } from "../../../redux/store";
import s from "./Profile.module.css";
import ava from "../../../img/profile_page/ava.jpeg";

type profilePropsType = {
    profilePage: profilePageType
}
type myPostsPropsType = {
    posts: postsType
}
type postPropsType = {
    id: number
    key: number
    postText: string
    likesCount: number
}

export const Profile = (props: profilePropsType) => {
    return (
        <div className={s.profileContainer}>
            <div className={s.mainPhoto}>
                <img src="https://images.ctfassets.net/hrltx12pl8hq/72HS9gzO2aIo6Ew7f82gmY/ea51b9e5e3549a9844f75c0cf58aec7e/05-nature_1487897981.jpg?fit=fill&w=480&h=270" alt="Nature" />
            </div>
            <div className={s.profilePage}>
                <ProfileInfo />
                <MyPosts posts={props.profilePage.posts} />
            </div>
        </div>
    )
}

export const MyPosts = (props: myPostsPropsType) => {
    const postsItems = props.posts.map(p => {
        return <Post id={p.id} key={p.id} 
                postText={p.postText} likesCount={p.likesCount} />
    })

    return (
        <div className={s.postsWrap}>
            <h3 className={s.postsTitle}>My posts</h3>
            <form className={s.postsForm}>
                <div className={s.postsFormInput}>
                    <textarea name="addPost" id="addPost"></textarea>
                </div>
                <button className={s.submitBtn}>Submit</button>
            </form>
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

export const ProfileInfo = () => {
    return (
        <div className={s.profileInfoContainer}>
            <div className={s.ava}>
                <img src={ava} alt="My_ava" />
            </div>
            <div className={s.description}>
                <div className={s.profileInfoItem}><span>First-name</span>: Viktor</div>
                <div className={s.profileInfoItem}><span>Last-name</span>: Viktor</div>
                <div className={s.profileInfoItem}><span>age</span>: 33</div>
                <ul className={s.contactsListWrap}>
                    <li className={s.contactsTitle}>Contacts:</li>
                    <ul className={s.contactsList}>
                        <li className={s.contactItem}><span>Youtube</span>: youtube.com</li>
                        <li className={s.contactItem}><span>Facebook</span>: facebook.com</li>
                        <li className={s.contactItem}><span>Linkedin</span>: linkedin.com</li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}