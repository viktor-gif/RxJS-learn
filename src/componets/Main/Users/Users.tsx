import React, { useEffect, useState } from "react";
import { usersType } from "../../../redux/store";
import s from "./Users.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import { Preloader } from "../../common/preloader/preloader";
import { NavLink } from "react-router-dom";
import { Paginator } from "../../common/paginator/Paginator";

export type usersPropsType = {
    users: usersType
    usersCount: number | null
    pageSize: number
    inProgress: boolean
    followingInProgressUsersId: number[]
    currentPage: number
    term: string
    isFriend: boolean

    getUsers: (pageNumber: number, term: string, isFriend: boolean) => void
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
    followingInProgressUsersId: number[]

    followPost: (id: number) => void
    followDelete: (id: number) => void
}

export const Users = React.memo((props: usersPropsType) => {

    const [term, setTerm] = useState('')
    const [isFriend, setIsFriend] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPorsion, setCurrentPorsion] = useState(1)

    useEffect(() => {
        // parameters is gettinng from redux-state, users-reducer
        props.getUsers(props.currentPage, props.term, props.isFriend)
    }, [])
    
    const usersItems = props.users?.map(u => {
        return <User id={u.id} key={u.id} photoUrl={u.photos.small}
            name={u.name}
            status={u.status}
            followingInProgressUsersId={props.followingInProgressUsersId}
            followed={u.followed}
            followPost={props.followPost}
            followDelete={props.followDelete} />
    })

    const isFriendClick = () => {
        if (isFriend) {
            setIsFriend(false)
            props.getUsers(props.currentPage, props.term, false)
        } else { 
            setIsFriend(true)
            props.getUsers(props.currentPage, props.term, true)
        }
    }
    function changeTermInput(e: any) {
        setTerm(e.target.value)
    }

    return (
        <>
        {props.inProgress ? <Preloader /> : 
            <div className={s.usersWrap}>
                <Paginator usersCount={props.usersCount} pageSize={props.pageSize}
                    term={props.term} isFriend={props.isFriend} getUsers={props.getUsers}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    currentPorsion={currentPorsion} setCurrentPorsion={setCurrentPorsion}
                />
                <div className={s.filterUsersBlock}>
                    
                    <input className={s.filterUsersBlock__term} value={term} 
                        onChange={changeTermInput} placeholder="Find user"
                        onKeyPress={(e: any) => {
                            if (e.charCode === 13) {
                                setTerm('')
                                props.getUsers(props.currentPage, term, props.isFriend);
                            }
                    }} />
                    <button className={s.filterUsersBlock__friends} onClick={isFriendClick}>{isFriend ? 'All Users' : 'Only friends'}</button>
                </div>
                {usersItems}
            </div>
        }
        </>
    )
})

export const User = React.memo((props: userPropsType) => {

    return <div className={s.userWrap}>
        
        <div className={s.ava}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.photoUrl ? props.photoUrl : avaMale} alt="UserAva" />
            </NavLink>
        </div>
        <div className={s.userName}>{props.name}</div>
        <div className={s.status}>{props.status}</div>
        <div className={s.followButton}>
            <button disabled={
                    props.followingInProgressUsersId.some(item => item === props.id)
                } onClick={() => {
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
})