import React from "react";
import { dialogsPageType, dialogsType, messagesType, usersType } from "../../../redux/store";
import { dialogsPageActions, } from "../../../redux/dialogs-reducer";
import s from "./Users.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import avaFemale from "../../../img/ava_female.png";
import { NavLink } from "react-router-dom"

export type usersPropsType = {
    users: usersType
    followUnfollow: (id: number) => void
}

type userPropsType = {
    id: number
    key: number
    url: string
    name: string
    location: {country: string, city: string}
    status: string
    sex: string
    followed: boolean
    followUnfollow: (id: number) => void
}

export const Users = (props: usersPropsType) => {

    const usersItems = props.users?.map(u => {
        return <User id={u.id} key={u.id} url={u.url}
            name={u.name} location={u.location}
            status={u.status} sex={u.sex}
            followed={u.followed} followUnfollow={props.followUnfollow} />
    })

    return (
        <div className={s.usersWrap}>{usersItems}</div>
    )
}

const User = (props: userPropsType) => {

    const followUnfollow = (id: number) => {
        props.followUnfollow(id)
    }

    return <div className={s.userWrap}>
        <div className={s.ava}>
            <img src={props.url} alt="UserAva" />
        </div>
        <div className={s.userName}>{props.name}</div>
        <div className={s.status}>{props.status}</div>
        <div className={s.followButton}>
            <button onClick={() => followUnfollow(props.id)}>{props.followed ? 'unfollow' : 'follow'}</button>
        </div>
        <div className={s.country}>Country: {props.location.country}</div>
        <div className={s.city}>City: {props.location.city}</div>
    </div>
}