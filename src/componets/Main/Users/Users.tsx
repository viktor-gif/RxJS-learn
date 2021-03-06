import React, { useEffect, useState } from "react";
import { usersType } from "../../../redux/store";
import s from "./Users.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import { Preloader } from "../../common/preloader/preloader";
import { NavLink } from "react-router-dom";
import { Paginator } from "../../common/paginator/Paginator";
import { SearchInput } from "../../common/searchInput/SearchInput";
import { usersAPI } from "../../../api/api";
import { Button } from "../../common/buttons/Button";

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

    const [term, setTerm] = useState<string>('')
    const [isFriend, setIsFriend] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentPorsion, setCurrentPorsion] = useState<number>(1)

    useEffect(() => {
        // parameters is gettinng from redux-state, users-reducer
        props.getUsers(props.currentPage, props.term, props.isFriend)
    }, [])

    useEffect(() => {
        usersAPI.getUsersMy()
        .then(res => console.log(res))
        
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

    const onEnterKeyPress = (e: any) => {
        if (e.charCode === 13) {
            setTerm('')
            props.getUsers(props.currentPage, term, props.isFriend);
        }
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

                    <SearchInput placeholder="Search users"
                        value={term} onChange={changeTermInput}
                        onKeyPress={onEnterKeyPress} />
                    
                    <Button buttonType="usersFriendsSearch" click={isFriendClick} value={isFriend ? 'All Users' : 'Only friends'} />
                </div>
                {usersItems}
            </div>
        }
        </>
    )
})

export const User = React.memo((props: userPropsType) => {

    const followUnfollowClickHandler = () => {
        if (props.followed === false) {
            props.followPost(props.id)
        } else if (props.followed === true) {
            props.followDelete(props.id)
        }   
    }

    return <div className={s.userWrap}>
        
        <div className={s.ava}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.photoUrl ? props.photoUrl : avaMale} alt="UserAva" />
            </NavLink>
        </div>
        <div className={s.userName}>{props.name}</div>
        <div className={s.status}>{props.status}</div>
        <div className={s.followButton}>
            <Button value={props.followed === true ? 'unfollow' : 'follow'}
                click={followUnfollowClickHandler}
                buttonType="followUnfollow"
                disabled={props.followingInProgressUsersId.some(item => item === props.id)} />
        </div>
        <div className={s.country}>Country: props.location.country</div>
        <div className={s.city}>City: props.location.city</div>
    </div>
})