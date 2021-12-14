import React, { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { connect } from "react-redux";
import { profileInfoType, stateType } from "../../../../redux/store";
import axios from "axios";
import { setStatus, setProfileInfo } from "../../../../redux/profile-reducer";

type propsType = {
    status: string | null
    profileInfo: profileInfoType
    setStatus: (status: string) => void
    setProfileInfo: (info: profileInfoType) => void
}

const ProfileInfoWrapMiddle = (props: propsType) => {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/2`,
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
    }, [])
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`,
            {
                withCredentials: true,
                headers: {
                    "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
                }
            }).then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    props.setProfileInfo(response.data)
                }
            })
    }, [])
    return (
        <ProfileInfo status={props.status}
                    profileInfo={props.profileInfo} />
    )
}

const mapStateToProps = (state: stateType) => ({
    status: state.profilePage.status,
    profileInfo: state.profilePage.profileInfo
})

export const ProfileInfoWrap = connect(mapStateToProps, {
    setStatus, setProfileInfo
})(ProfileInfoWrapMiddle)