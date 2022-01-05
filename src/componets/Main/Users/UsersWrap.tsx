import React from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { getUsers, followPost, followDelete } from "../../../redux/users-reducer";
import { getUsersRes } from "../../../selectors/users-selectors";

export type usersWrapPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    currentPage: number
    term: string
    isFriend: boolean
    inProgress: boolean
    followingInProgressUsersId: number[]

    getUsers: (pageSize: number, pageNumber: number, term: string, isFriend: boolean) => void
    followPost: (userId: number) => void
    followDelete: (userId: number) => void
}

const  UsersWrapMiddle = React.memo((props: usersWrapPropsType) => {
    const getUsers = (pageNumber: number, term: string, isFriend: boolean) => {
        props.getUsers(props.pageSize, pageNumber, term, isFriend)
    }

    return <Users users={props.users}
                usersCount={props.usersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                term={props.term}
                isFriend={props.isFriend}
                inProgress={props.inProgress}
                followingInProgressUsersId={props.followingInProgressUsersId}

                getUsers={getUsers}
                followPost={props.followPost}
                followDelete={props.followDelete}
                 />
})

const mapStateToProps = (state: stateType) => {
    return {
       users: getUsersRes(state),
       usersCount: state.usersPage.usersCount,
       pageSize: state.usersPage.pageSize,
       currentPage: state.usersPage.currentPage,
       term: state.usersPage.term,
       isFriend: state.usersPage.isFriend,
       inProgress: state.usersPage.inProgress,
       followingInProgressUsersId: state.usersPage.followingInProgressUsersId
    }
}

export const UsersWrap = connect(mapStateToProps, { getUsers,
    followPost, followDelete
    //@ts-ignore
})(UsersWrapMiddle)

