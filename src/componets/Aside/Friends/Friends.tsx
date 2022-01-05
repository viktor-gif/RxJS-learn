import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getFriends } from "../../../redux/aside-reducer"
import { stateType, usersType } from "../../../redux/store"
import userPhoto from "../../../img/ava_male.jpeg"
import s from "./Friends.module.css"

type propsType = {
    friends: usersType

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
            <div className={s.demoImg}>
                <img src={f.photos.small || userPhoto} alt="Friend" />
            </div>
            <span className={s.demoName}>{shortName}...</span>
        </div>
    }).slice(0, 6)

    return <div>
        <div className={s.demoBlock}>
            {friendsDemo}
        </div>
        
    </div>
}

const mapStateToProps = (state: stateType) => ({
    friends: state.aside.friends
})

export default connect(mapStateToProps, {getFriends})(Friends)