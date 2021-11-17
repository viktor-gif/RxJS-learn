import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { Messages } from "./Messages/Messages";
import { Profile } from "./Profile/Profile";

type propsType = {
    dialogsPage: dialogsPageType
    profilePage: profilePageType
}

export const Main = (props: propsType) => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile profilePage={props.profilePage} />} />
        <Route path="/messages" render={() => <Messages />} />
    </div>
}