import React  from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";

export const Nav = () => {
    return <div className={s.navContainer}>
        <ul className={s.navList}>
            <NavLink activeClassName={s.active} to="/profile"><li>Profile</li></NavLink>
            <NavLink activeClassName={s.active} to="/messages"><li>Messages</li></NavLink>
            <NavLink activeClassName={s.active} to="/news"><li>News</li></NavLink>
            <NavLink activeClassName={s.active} to="/music"><li>Music</li></NavLink>
            <NavLink activeClassName={s.active} to="settings"><li>Settings</li></NavLink>
        </ul>
    </div>
}