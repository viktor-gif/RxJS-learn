import React, { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { connect } from "react-redux";
import { profileInfoType, stateType } from "../../../../redux/store";
import { getProfileData, getStatus } from "../../../../redux/profile-reducer";
import { withRouter } from "react-router";

type propsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
    getStatus: (userId: number) => void
    getProfileData: (userId: number) => void
    match: any
}

const ProfileInfoWrapMiddle = (props: propsType) => {
    let userId = props.match.params.userId
    if(!userId) userId = props.userId

    useEffect(() => {
        props.getStatus(userId)
    }, [props.userId])
    useEffect(() => {
        props.getProfileData(userId)
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
    getProfileData, getStatus
})(ProfileInfoWrapMiddle))