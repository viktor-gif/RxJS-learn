import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getFriends } from "../../../redux/aside-reducer"
import { stateType, usersType } from "../../../redux/store"
import userPhoto from "../../../img/ava_male.jpeg"
import s from "./Friends.module.css"
import { NavLink } from "react-router-dom"
import { User } from "../../Main/Users/Users"
import { followPost, followDelete } from "../../../redux/users-reducer"

type propsType = {
    friends: usersType
    friendsCount: number
    followingInProgressUsersId: number[]
    ownerId: number | null

    getFriends: () => void
    followPost: (id: number) => void
    followDelete: (id: number) => void
}

const Friends = React.memo((props: propsType) => {

    const [isFriendsBlock, setFriendsBlock] = useState(false)

    useEffect(() => {
        props.getFriends()
    }, [!props.friends, props.ownerId])

    const shuffle = (arr: usersType) => {
        // @ts-ignore
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    
    let shuffledFriends = props.friends && shuffle(props.friends)

    const friendsDemo = shuffledFriends?.map(f => {
        let shortName = f.name.slice(0, 7)
        return <div key={f.id} className={s.demoItem}>
            <NavLink to={`/profile/${f.id}`} exact className={s.navLinkFriend}>
                <div className={s.demoImg}>
                    <img src={f.photos.small || userPhoto} alt="Friend" />
                </div>
                <div className={s.demoName}>{shortName}...</div>
            </NavLink>
        </div>
    }).slice(0, 6)

    const allFriends = props.friends?.map(f => {
        return <User id={f.id} key={f.id}
            photoUrl={f.photos.small}
            name={f.name} status={f.status}
            followingInProgressUsersId={props.followingInProgressUsersId}
            followed={f.followed}
            followPost={props.followPost}
            followDelete={props.followDelete} />
    })


    return (
        <div className={s.friendsBlock}>
            <div className={s.navFriends}>
                <span className={s.allFriendsLink}
                    onClick={() => setFriendsBlock(true)}>
                    All friends
                </span>
                <span>{props.friendsCount}</span>
            </div>
            <div className={s.demoBlock}>
                {friendsDemo}
            </div>
            <div className={s.allFriends + " " + (isFriendsBlock && s.friendsBlockActive)}>
                <div className={s.closeFriendsBlock} onClick={() => setFriendsBlock(false)}></div>
                <div className={s.allFriendsBlock}>
                    {allFriends}
                </div>
            </div>
        </div>
    )
})

const mapStateToProps = (state: stateType) => ({
    friends: state.aside.friends,
    friendsCount: state.aside.totalFriendsCount,
    followingInProgressUsersId: state.usersPage.followingInProgressUsersId,
    ownerId: state.auth.id
})

export default connect(mapStateToProps, {
    getFriends, followPost, followDelete
})(Friends)