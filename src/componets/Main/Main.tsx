import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { Dialogs } from "./Messages/Dialogs";
import { Profile } from "./Profile/Profile";

type propsType = {
    dialogsPage: dialogsPageType
    profilePage: profilePageType
}

export const Main = (props: propsType) => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile profilePage={props.profilePage} />} />
        <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.dialogsPage} />} />
    </div>
}