import React, { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { connect } from "react-redux";
import { profileInfoType, stateType } from "../../../../redux/store";
import axios from "axios";
import { setStatus, setProfileInfo } from "../../../../redux/profile-reducer";
import { withRouter } from "react-router";
import { profileAPI } from "../../../../api/api";

type propsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
    setStatus: (status: string) => void
    setProfileInfo: (info: profileInfoType) => void
    match: any
}

const ProfileInfoWrapMiddle = (props: propsType) => {
    let userId = props.match.params.userId
    if(!userId) userId = props.userId

    console.log(profileAPI.getStatus(userId))
    useEffect(() => {
        profileAPI.getProfileData(userId).then(response => {
                props.setProfileInfo(response.data)
            })
    }, [props.userId])
    useEffect(() => {
        profileAPI.getStatus(userId).then(response => {
                props.setStatus(response.data)
            })
    }, [props.userId])
    return (
        <ProfileInfo status={props.status}
                    profileInfo={props.profileInfo}
                    isAuth={props.isAuth}
                    userId={props.userId} />
    )
}

const mapStateToProps = (state: stateType) => ({
    status: state.profilePage.status,
    profileInfo: state.profilePage.profileInfo,
    isAuth: state.auth.isAuth,
    userId: state.auth.id
})

export const ProfileInfoWrap = withRouter(connect(mapStateToProps, {
    setStatus, setProfileInfo
})(ProfileInfoWrapMiddle))