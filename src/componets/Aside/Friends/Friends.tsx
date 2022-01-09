import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getFriends, setFriendsCount } from "../../../redux/aside-reducer"
import { stateType, usersType } from "../../../redux/store"
import userPhoto from "../../../img/ava_male.jpeg"
import s from "./Friends.module.css"
import { NavLink } from "react-router-dom"

type propsType = {
    friends: usersType
    friendsCount: number

    getFriends: () => void
}

const Friends = (props: propsType) => {

    useEffect(() => {
        props.getFriends()
    }, [])


    const shuffle = (arr: usersType) => {
        // @ts-ignore
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    
    let shuffledFriends = props.friends && shuffle(props.friends)

    const friendsDemo = shuffledFriends?.map(f => {
        let shortName = f.name.slice(0, 7)
        return <div key={f.id} className={s.demoItem}>
            <NavLink to={`/profile/${f.id}`} className={s.navLinkFriend}>
                <div className={s.demoImg}>
                    <img src={f.photos.small || userPhoto} alt="Friend" />
                </div>
                <div className={s.demoName}>{shortName}...</div>
            </NavLink>
        </div>
    }).slice(0, 6)

    return (
        <div className={s.friendsBlock}>
            <div className={s.navFriends}>
                <span>All friends</span>
                <span>{props.friendsCount}</span>
            </div>
            <div className={s.demoBlock}>
                {friendsDemo}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state: stateType) => ({
    friends: state.aside.friends,
    friendsCount: state.aside.totalFriendsCount
})

export default connect(mapStateToProps, {getFriends})(Friends)