import React from "react";
import s from "./Profile.module.css";
import { MyPostsWrap } from "./MyPosts/MyPostsWrap";
import { ProfileInfoWrap } from "./ProfileInfo/ProfileInfoWrap";
import { connect } from "react-redux";
import { stateType } from "../../../redux/store";
import { withAuthRedirect } from "../../../HOC/WithAuthRedirect";

type profilePropsType = {

}

const Profile = React.memo((props: profilePropsType) => {

    sessionStorage.path = 'profile'

    return (
        <div className={s.profileContainer}>
            <div className={s.profilePage}>
                <ProfileInfoWrap />
                <MyPostsWrap />
            </div>
        </div>
    )
})

const mapStateToProps = (state: stateType) => ({
    
})

export default withAuthRedirect(connect(mapStateToProps, {})(Profile))