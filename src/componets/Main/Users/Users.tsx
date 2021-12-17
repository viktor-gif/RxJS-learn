import React, { useState } from "react";
import { usersType } from "../../../redux/store";
import s from "./Users.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import axios from "axios";
import { Preloader } from "../../preloader/preloader";
import { NavLink } from "react-router-dom";

export type usersPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    inProgress: boolean

    changePageNumber: (pageNumber: number) => void
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    followPost: (id: number) => void
    followDelete: (id: number) => void
}

type userPropsType = {
    id: number
    key: number
    photoUrl: string | null
    name: string
    status: string | null
    followed: boolean

    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    followPost: (id: number) => void
    followDelete: (id: number) => void
}

export const Users = (props: usersPropsType) => {

    const [currentPage, setCurrentPage] = useState(1)

    const usersItems = props.users?.map(u => {
        return <User id={u.id} key={u.id} photoUrl={u.photos.small}
            name={u.name}
            status={u.status}
            followed={u.followed} followUnfollow={props.followUnfollow}
            setUsers={props.setUsers}
            followPost={props.followPost}
            followDelete={props.followDelete} />
    })

    const pagesCount: number | null = props.usersCount && Math.ceil(props.usersCount / props.pageSize)

    let pagesNumbers = []
    if (pagesCount) {
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumbers.push(i)
        }
    }
    const pages = pagesNumbers.map(p => {
        return <span className={s.page + ' ' + (currentPage === p ? s.currentPage : '')} onClick={() => {
            props.changePageNumber(p);
            setCurrentPage(p);
            }}>
            {p}
        </span>
    })

    return (
        <>
        {props.inProgress ? <Preloader /> : 
            <div className={s.usersWrap}>
                <div className={s.paginator}>
                    {pages}
                </div>
                {usersItems}
            </div>
        }
        </>
    )
}

const User = (props: userPropsType) => {

    return <div className={s.userWrap}>
        
        <div className={s.ava}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.photoUrl ? props.photoUrl : avaMale} alt="UserAva" />
            </NavLink>
        </div>
        <div className={s.userName}>{props.name}</div>
        <div className={s.status}>{props.status}</div>
        <div className={s.followButton}>
            <button onClick={() => {
                if (props.followed === false) {
                    props.followPost(props.id)
                } else if (props.followed === true) {
                    props.followDelete(props.id)
                }   
            }}>{props.followed === true ? 'unfollow' : 'follow'}</button>
        </div>
        <div className={s.country}>Country: props.location.country</div>
        <div className={s.city}>City: props.location.city</div>
    </div>
}