import React, { useState, useEffect }  from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import { stateType } from "../../redux/store";
import s from "./Header.module.css";
import { logout } from "../../redux/auth-reducer"
import { getProfileData } from "../../redux/profile-reducer"

type propsType = {
    isAuth: boolean
    login: string | null
    userAva: string | null | undefined
    userId: number | null

    logout: () => void
    getProfileData: (userId: number) => void
}

const Header = (props: propsType) => {

    const [isDropdownActive, setDropdownActive] = useState(false)

    useEffect(() => {
        if (props.userId) props.getProfileData(props.userId)
    }, [])

    useEffect(() => {
        const headerMenu = document.querySelector('#headerMenu')

        document.addEventListener('click', (e) => {


            console.log(e.target)
            if (e.target !== headerMenu && e.target !== headerMenu?.children[0] ) {
                setDropdownActive(false)
            }
        })
    }, [])

    const navToggleClick = () => {
        if (isDropdownActive) {
            setDropdownActive(false)
        } else if (!isDropdownActive) {
            setDropdownActive(true)
        }
    }

    return <div className={s.header}>
        <img className={s.logoPic} src={logo} alt="logo" />
        <div>{props.isAuth 
            ? <div className={s.headerNavWrap}>
            {/* <span className={s.headernavItem}>props.login</span> */}
            <ul id='dropDownMenu'
            className={s.dropdownMenu + ' ' + (isDropdownActive && s.dropdownMenuActive)}>
                <li className={s.dropDownMenuItem}>Settings</li>
                <li onClick={props.logout} className={s.dropDownMenuItem}>Log out</li>
            </ul>
            <div id='headerMenu' onClick={navToggleClick}
                className={s.headernavItem + " " + s.headerNavItemAuth}>
                <img src={props.userAva ? props.userAva : ""} alt="userAva" />
            </div>
            
            
            {/* <button className={s.headernavItem} onClick={props.logout}>Log out</button> */}
        </div> : 
        <div className={s.headerNavWrap}>
            <NavLink className={s.headernavItem} to="/login"><button>Sign in</button></NavLink>
            <a className={s.headernavItem} href="/login"><button>Sign up</button></a>
        </div>}</div>
    </div>
}

const mapStateToProps = (state: stateType) => ({
    userAva: state.profilePage.profileInfo?.photos.small,
    userId: state.auth.id
})

export default connect(mapStateToProps, {logout, getProfileData})(Header)