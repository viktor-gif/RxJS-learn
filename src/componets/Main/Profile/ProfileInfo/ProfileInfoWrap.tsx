import React, { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { connect } from "react-redux";
import { profileInfoType, stateType } from "../../../../redux/store";
import { getProfileData, getStatus, setStatus } from "../../../../redux/profile-reducer";
import { withRouter } from "react-router";

type propsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
    match: any
    history: any

    getStatus: (userId: number) => void
    getProfileData: (userId: number) => void
    setStatus: (status: string, userId: number) => void
}

const ProfileInfoWrapMiddle = (props: propsType) => {
    
    let userId = props.match.params.userId
    if(!userId) {
        userId = props.userId
        if (!userId) {
            props.history.push('/login')
        }
    }

    useEffect(() => {
        props.getStatus(userId)
    }, [props.userId, userId])
    useEffect(() => {
        props.getProfileData(userId)
    }, [props.userId, userId])
    return (
        <ProfileInfo status={props.status}
                    profileInfo={props.profileInfo}
                    isAuth={props.isAuth}
                    userId={props.userId}
                    setStatus={props.setStatus} />
    )
}

const mapStateToProps = (state: stateType) => ({
    status: state.profilePage.status,
    profileInfo: state.profilePage.profileInfo,
    isAuth: state.auth.isAuth,
    userId: state.auth.id
})

export const ProfileInfoWrap = withRouter(connect(mapStateToProps, {
    getProfileData, getStatus, setStatus
})(ProfileInfoWrapMiddle))