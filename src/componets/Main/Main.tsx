import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { DialogsWrap } from "./Messages/DialogsWrap";
import { Profile } from "./Profile/Profile";
import { UsersWrap } from "./Users/UsersWrap";



export const Main = () => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile  />} />
        <Route path="/dialogs" render={() => <DialogsWrap />} />
        <Route path="/users" render={() => <UsersWrap />} />
    </div>
}