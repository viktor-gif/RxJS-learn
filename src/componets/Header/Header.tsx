import React  from "react";
import logo from "../../img/logo.png";
import s from "./Header.module.css";

export const Header = () => {
    return <div className={s.header}>
        <img className={s.logoPic} src={logo} alt="logo" />
    </div>
}