import React, { useEffect } from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { followUnfollow, setProgress, setUsers, setUsersCount, setFollowingProgress } from "../../../redux/users-reducer";
import { usersAPI } from "../../../api/api";

export type usersWrapPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    inProgress: boolean
    followingInProgress: boolean
    followingInProgressUsersId: number[]
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    setUsersCount: (usersCount: number) => void
    setProgress: (isProgress: boolean) => void
    setFollowingProgress: (userId: number | null, isProgress: boolean) => void
}

const  UsersWrapMiddle = React.memo((props: usersWrapPropsType) => {
    useEffect(() => {
        props.setProgress(true)
        usersAPI.getUsers(props.pageSize).then(response => {
                props.setUsersCount(response.data.totalCount)
                props.setUsers(response.data.items)
                props.setProgress(false)
            })
    }, [])

    const followPost = (userId: number) => {
        props.setFollowingProgress(userId, true)
        usersAPI.followPost(userId).then(response => {
                if (response.data.resultCode === 0) {
                    props.followUnfollow(userId)
                    props.setFollowingProgress(userId, false)
                }
            })
    }
    const followDelete = (userId: number) => {
        props.setFollowingProgress(userId, true)
        usersAPI.followDelete(userId).then(response => {
                if (response.data.resultCode === 0) {
                    props.followUnfollow(userId)
                    props.setFollowingProgress(userId, false)
                }
            })
    }

    const changePageNumber = (pageNumber: number) => {
        props.setProgress(true)
        usersAPI.getUsers(props.pageSize, pageNumber).then(response => {
                props.setUsers(response.data.items)
                props.setProgress(false)
            })
    }

    return <Users users={props.users}
                followUnfollow={props.followUnfollow}
                setUsers={props.setUsers}
                usersCount={props.usersCount}
                pageSize={props.pageSize}
                changePageNumber={changePageNumber}
                inProgress={props.inProgress}
                followingInProgress={props.followingInProgress}
                followingInProgressUsersId={props.followingInProgressUsersId}
                followPost={followPost}
                followDelete={followDelete}
                 />
})

const mapStateToProps = (state: stateType) => {
    return {
       users: state.usersPage?.users,
       usersCount: state.usersPage.usersCount,
       pageSize: state.usersPage.pageSize,
       inProgress: state.usersPage.inProgress,
       followingInProgress: state.usersPage.followingInProgress,
       followingInProgressUsersId: state.usersPage.followingInProgressUsersId
    }
}

export const UsersWrap = connect(mapStateToProps, {
    followUnfollow, setUsers, setUsersCount, setProgress, setFollowingProgress
})(UsersWrapMiddle)

