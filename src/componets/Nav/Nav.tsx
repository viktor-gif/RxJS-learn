import React  from "react";
import s from "./Nav.module.css";

export const Nav = () => {
    return <div className={s.navContainer}>
        <ul className={s.navList}>
            <a href="!#"><li>Profile</li></a>
            <a href="!#"><li>Messages</li></a>
            <a href="!#"><li>News</li></a>
            <a href="!#"><li>Music</li></a>
            <a href="!#"><li>Settings</li></a>
        </ul>
    </div>
}