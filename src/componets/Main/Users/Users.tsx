import React from "react";
import { usersType } from "../../../redux/store";
import s from "./Users.module.css";
import avaMale from "../../../img/ava_male.jpeg";
import axios from "axios";
import { textChangeRangeIsUnchanged } from "typescript";

export type usersPropsType = {
    users: usersType
    totalUsersCount: number | null
    pageSize: number
    followUnfollow: (id: number) => void
    setUsers: (users: usersType) => void
    setCurrentPage: (pageNumber: number) => void
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
}

type usersStateType = {
    currentPage: number
}

export class Users extends React.Component<usersPropsType, usersStateType> {

    constructor(props: usersPropsType) {
        super(props)
        this.state = {
            currentPage: 1
        }
    }

    render() {
        console.log(this.props.totalUsersCount)
        const pagesArr = []
        const pagesCount = this.props.totalUsersCount 
            && Math.ceil(this.props.totalUsersCount / this.props.pageSize)
    
        if (pagesCount) {
            for (let i = 1; i <= pagesCount; i++) {
                pagesArr.push(i)
            }
        }

        const pages = pagesArr.map(p => {
            return <span className={s.pageBtns + ' ' +
                (this.state.currentPage === p && s.currentPage)}
                onClick={() => {
                    this.setState({currentPage: p})
                    this.props.setCurrentPage(p)
                }}>
                    {p}
                </span>
        })

        const usersItems = this.props.users?.map(u => {
            return <User id={u.id} key={u.id} photoUrl={u.photos.small}
                name={u.name}
                status={u.status}
                followed={u.followed} followUnfollow={this.props.followUnfollow}
                setUsers={this.props.setUsers} />
        })
    
        return (
            <div className={s.usersWrap}>
                <div className={s.pagesButtons}>
                    {pages}
                </div>
                {usersItems}
            </div>
        )
    }
    
}

const User = (props: userPropsType) => {

    const followUnfollow = (id: number) => {
        props.followUnfollow(id)
    }

    return <div className={s.userWrap}>
        <div className={s.ava}>
            <img src={props.photoUrl ? props.photoUrl : avaMale} alt="UserAva" />
        </div>
        <div className={s.userName}>{props.name}</div>
        <div className={s.status}>{props.status}</div>
        <div className={s.followButton}>
            <button onClick={() => {
                if (props.followed === false) {
                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`,
                        {}, {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
                            }
                        }).then(response => {
                            if (response.data.resultCode === 0) {
                                followUnfollow(props.id)
                                
                            }
                        })
                } else if (props.followed === true) {
                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`,
                         {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
                            }
                        }).then(response => {
                            if (response.data.resultCode === 0) {
                                followUnfollow(props.id)
                            }
                        })
                }   
            }}>{props.followed === true ? 'unfollow' : 'follow'}</button>
        </div>
        <div className={s.country}>Country: props.location.country</div>
        <div className={s.city}>City: props.location.city</div>
    </div>
}