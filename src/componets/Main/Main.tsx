import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { DialogsWrap } from "./Messages/DialogsWrap";
import { Profile } from "./Profile/Profile";

type propsType = {}

export const Main = (props: propsType) => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile  />} />
        <Route path="/dialogs" render={() => <DialogsWrap />} />
    </div>
}