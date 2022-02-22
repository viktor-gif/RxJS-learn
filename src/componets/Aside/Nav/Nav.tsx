import React  from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";

export const Nav = () => {
    return <nav className={s.navContainer}>
        <ul className={s.navList}>
            <NavLink activeClassName={s.active} to="/profile"><li>Profile</li></NavLink>
            <NavLink activeClassName={s.active} to="/dialogs"><li>Messages</li></NavLink>
            <NavLink activeClassName={s.active} to="/users"><li>Users</li></NavLink>
            <NavLink activeClassName={s.active} to="/news"><li>News</li></NavLink>
            <NavLink activeClassName={s.active} to="/music"><li>Music</li></NavLink>
            <NavLink activeClassName={s.active} to="settings"><li>Settings</li></NavLink>
            <NavLink activeClassName={s.active} to="slide"><li>Slide</li></NavLink>
        </ul>
    </nav>
}