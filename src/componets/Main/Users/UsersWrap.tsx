import React, { useEffect } from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { followUnfollow, setProgress, setUsers, setUsersCount, setFollowingProgress, setCurrentPage, setTerm, setIsFriend } from "../../../redux/users-reducer";
import { usersAPI } from "../../../api/api";

export type usersWrapPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    currentPage: number
    term: string
    isFriend: boolean
    inProgress: boolean
    followingInProgress: boolean
    followingInProgressUsersId: number[]

    setTerm: (term: string) => void
    setIsFriend: (isFriend: boolean) => void
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    setUsersCount: (usersCount: number) => void
    setProgress: (isProgress: boolean) => void
    setFollowingProgress: (userId: number | null, isProgress: boolean) => void
    setCurrentPage: (page: number) => void
}

const  UsersWrapMiddle = React.memo((props: usersWrapPropsType) => {
    // useEffect(() => {
        
    //     props.setProgress(true)
    //     usersAPI.getUsers(props.pageSize, props.pageNumber).then(response => {
    //             props.setUsersCount(response.data.totalCount)
    //             props.setUsers(response.data.items)
    //             props.setProgress(false)
    //         })
    // }, [])

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

    const getUsers = (pageNumber: number, term: string, isFriend: boolean) => {
        props.setCurrentPage(pageNumber)
        props.setTerm(term)
        props.setIsFriend(isFriend)
        props.setProgress(true)
        usersAPI.getUsers(props.pageSize, pageNumber, term, isFriend).then(response => {
                props.setUsersCount(response.data.totalCount)
                props.setUsers(response.data.items)
                props.setProgress(false)
            })
    }

    return <Users users={props.users}
                followUnfollow={props.followUnfollow}
                setUsers={props.setUsers}
                usersCount={props.usersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                term={props.term}
                isFriend={props.isFriend}
                getUsers={getUsers}
                inProgress={props.inProgress}
                followingInProgress={props.followingInProgress}
                followingInProgressUsersId={props.followingInProgressUsersId}
                followPost={followPost}
                followDelete={followDelete}
                setTerm={props.setTerm}
                setIsFriend={props.setIsFriend}
                 />
})

const mapStateToProps = (state: stateType) => {
    return {
       users: state.usersPage?.users,
       usersCount: state.usersPage.usersCount,
       pageSize: state.usersPage.pageSize,
       currentPage: state.usersPage.currentPage,
       term: state.usersPage.term,
       isFriend: state.usersPage.isFriend,
       inProgress: state.usersPage.inProgress,
       followingInProgress: state.usersPage.followingInProgress,
       followingInProgressUsersId: state.usersPage.followingInProgressUsersId
    }
}

export const UsersWrap = connect(mapStateToProps, {
    followUnfollow, setUsers, setUsersCount, setProgress, setFollowingProgress, setCurrentPage, setTerm, setIsFriend
})(UsersWrapMiddle)

