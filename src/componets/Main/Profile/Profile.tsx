import React from "react";
import s from "./Profile.module.css";
import { MyPostsWrap } from "./MyPosts/MyPostsWrap";
import { ProfileInfoWrap } from "./ProfileInfo/ProfileInfoWrap";
import { connect } from "react-redux";
import { stateType } from "../../../redux/store";
import { Redirect } from "react-router-dom";

type profilePropsType = {
    isAuth: boolean
}



const Profile = (props: profilePropsType) => {

    if (!props.isAuth) return <Redirect to="login" />

    return (
        <div className={s.profileContainer}>
            <div className={s.mainPhoto}>
                <img src="https://images.ctfassets.net/hrltx12pl8hq/72HS9gzO2aIo6Ew7f82gmY/ea51b9e5e3549a9844f75c0cf58aec7e/05-nature_1487897981.jpg?fit=fill&w=480&h=270" alt="Nature" />
            </div>
            <div className={s.profilePage}>
                <ProfileInfoWrap />
                <MyPostsWrap />
            </div>
        </div>
    )
}

const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {})(Profile)