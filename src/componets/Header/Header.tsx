import React, { useState, useEffect }  from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import { stateType } from "../../redux/store";
import s from "./Header.module.css";
import { logout, getOwnerProfileInfo } from "../../redux/auth-reducer"

type propsType = {
    isAuth: boolean
    login: string | null
    userAva: string | null | undefined
    userId: number | null

    logout: () => void
    getOwnerProfileInfo: (ownerId: number) => void
}

const Header = (props: propsType) => {

    const [isDropdownActive, setDropdownActive] = useState(false)

    useEffect(() => {
        (props.userId) && props.getOwnerProfileInfo(props.userId)
    }, [props.userId])

    const navToggleClick = () => {
        if (isDropdownActive) {
            setDropdownActive(false)
        } else if (!isDropdownActive) {
            setDropdownActive(true) 
        }
        
        // if (isDropdownActive === true) {
        //     debugger
        //     setDropdownActive(false)
        // }
        // if (isDropdownActive === false) {
        //     debugger
        //     setDropdownActive(true) 
        // }
    }

    return <div className={s.header}>
        <img className={s.logoPic} src={logo} alt="logo" />
        <div>{props.isAuth
            ? <div onClick={navToggleClick} className={s.headerNavWrap}>
                {/* <span className={s.headernavItem}>props.login</span> */}
                <ul id='dropDownMenu'
                className={s.dropdownMenu + ' ' + (isDropdownActive && s.dropdownMenuActive)}>
                    <li className={s.dropDownMenuItem}>Settings</li>
                    <li onClick={props.logout} className={s.dropDownMenuItem}>Log out</li>
                </ul>
                <div id='headerMenu'
                    className={s.headernavItem + " " + s.headerNavItemAuth}>
                    <img src={props.userAva ? props.userAva : ""} alt="userAva" />
                </div>
                
                
                {/* <button className={s.headernavItem} onClick={props.logout}>Log out</button> */}
            </div> : 
            <div className={s.headerNavWrap}>
                <NavLink className={s.headernavItem} to="/login"><button>Sign in</button></NavLink>
                <a className={s.headernavItem} href="/login"><button>Sign up</button></a>
            </div>}
        </div>
    </div>
}

const mapStateToProps = (state: stateType) => ({
    userAva: state.auth.ownerProfileInfo?.photos.small,
    userId: state.auth.id
})

export default connect(mapStateToProps, {logout, getOwnerProfileInfo})(Header)