import React  from "react";
import logo from "../../img/logo.png";
import s from "./Header.module.css";

type propsType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: propsType) => {
    return <div className={s.header}>
        <img className={s.logoPic} src={logo} alt="logo" />
        <div>{props.isAuth ? props.login : "YOU ARE NOT AUTHORIZED"}</div>
    </div>
}