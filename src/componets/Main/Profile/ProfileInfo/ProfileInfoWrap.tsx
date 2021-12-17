import React, { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { connect } from "react-redux";
import { profileInfoType, stateType } from "../../../../redux/store";
import axios from "axios";
import { setStatus, setProfileInfo } from "../../../../redux/profile-reducer";
import { withRouter } from "react-router";

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
    console.log(props.userId)
    let userId = props.match.params.userId
    if(!userId) userId = props.userId

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${userId}`,
            {
                withCredentials: true,
                headers: {
                    "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
                }
            }).then(response => {
                if (response.status === 200) {
                    props.setStatus(response.data) 
                }
            })
    }, [props.userId])
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`,
            {
                withCredentials: true,
                headers: {
                    "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
                }
            }).then(response => {
                if (response.status === 200) {
                    props.setProfileInfo(response.data)
                }
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