import React, { useEffect } from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { followUnfollow, setProgress, setUsers, setUsersCount } from "../../../redux/users-reducer";
import { usersAPI } from "../../../api/api";

export type usersWrapPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    inProgress: boolean
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    setUsersCount: (usersCount: number) => void
    setProgress: (isProgress: boolean) => void
}

const  UsersWrapMiddle = (props: usersWrapPropsType) => {
    useEffect(() => {
        usersAPI.getUsers(props.pageSize).then(response => {
                props.setUsersCount(response.data.totalCount)
                props.setUsers(response.data.items)
                props.setProgress(false)
            })
    }, [])

    const followPost = (userId: number) => {
        usersAPI.followPost(userId).then(response => {
                if (response.data.resultCode === 0) {
                    props.followUnfollow(userId)
                    
                }
            })
    }
    const followDelete = (userId: number) => {
        usersAPI.followDelete(userId).then(response => {
                if (response.data.resultCode === 0) {
                    props.followUnfollow(userId)
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
                followPost={followPost}
                followDelete={followDelete}
                 />
}

const mapStateToProps = (state: stateType) => {
    return {
       users: state.usersPage?.users,
       usersCount: state.usersPage.usersCount,
       pageSize: state.usersPage.pageSize,
       inProgress: state.usersPage.inProgress
    }
}

export const UsersWrap = connect(mapStateToProps, {
    followUnfollow, setUsers, setUsersCount, setProgress
})(UsersWrapMiddle)

