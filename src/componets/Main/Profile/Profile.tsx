import React from "react";
import { profilePageType } from "../../../redux/store";
import s from "./Profile.module.css";
import ava from "../../../img/ava_male.jpeg";
import { MyPostsWrap } from "./MyPosts/MyPostsWrap";

type profilePropsType = {}

export const Profile = (props: profilePropsType) => {
    return (
        <div className={s.profileContainer}>
            <div className={s.mainPhoto}>
                <img src="https://images.ctfassets.net/hrltx12pl8hq/72HS9gzO2aIo6Ew7f82gmY/ea51b9e5e3549a9844f75c0cf58aec7e/05-nature_1487897981.jpg?fit=fill&w=480&h=270" alt="Nature" />
            </div>
            <div className={s.profilePage}>
                <ProfileInfo />
                <MyPostsWrap />
            </div>
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