import React, { useEffect } from "react";
import { stateType, usersType } from "../../../redux/store";
import { connect } from "react-redux";
import { Users } from "./Users";
import { usersPageActions } from "../../../redux/users-reducer";
import axios from "axios";

export type usersWrapPropsType = {
    users: usersType
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
}

const  UsersWrapMiddle = (props: usersWrapPropsType) => {
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            withCredentials: true,
            headers: {
                "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
            }
        })
            .then(response => {
                props.setUsers(response.data.items)
            })
    }, [])

    return <Users users={props.users}
                followUnfollow={props.followUnfollow}
                setUsers={props.setUsers} />
}

const mapStateToProps = (state: stateType) => {
    return {
       users: state.usersPage?.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        followUnfollow: (id: number) => dispatch(usersPageActions.followUnfollow(id)),
        setUsers: (users:usersType) => dispatch(usersPageActions.setUsers(users))
    }
}

export const UsersWrap = connect(mapStateToProps, mapDispatchToProps)(UsersWrapMiddle)

