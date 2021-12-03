import React, { useEffect, useState } from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { usersPageActions } from "../../../redux/users-reducer";
import axios from "axios";

export type usersWrapPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    setUsersCount: (usersCount: number) => void
}

const  UsersWrapMiddle = (props: usersWrapPropsType) => {
    const [usersCount, setUsersCount] = useState(0)
    const pageSize: number = 10
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=1`, {
            withCredentials: true,
            headers: {
                "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
            }
        })
            .then(response => {
                props.setUsersCount(response.data.totalCount)
                props.setUsers(response.data.items)
            })
    }, [])

    const changePageNumber = (pageNumber: number) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${pageNumber}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
            }
        })
            .then(response => {
                props.setUsers(response.data.items)
            })
    }

    return <Users users={props.users}
                followUnfollow={props.followUnfollow}
                setUsers={props.setUsers}
                usersCount={props.usersCount}
                pageSize={props.pageSize}
                changePageNumber={changePageNumber} />
}

const mapStateToProps = (state: stateType) => {
    return {
       users: state.usersPage?.users,
       usersCount: state.usersPage.usersCount,
       pageSize: state.usersPage.pageSize
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        followUnfollow: (id: number) => dispatch(usersPageActions.followUnfollow(id)),
        setUsers: (users:usersType) => dispatch(usersPageActions.setUsers(users)),
        setUsersCount: (usersCount: number) => dispatch(usersPageActions.setUsersCount(usersCount))
    }
}

export const UsersWrap = connect(mapStateToProps, mapDispatchToProps)(UsersWrapMiddle)

