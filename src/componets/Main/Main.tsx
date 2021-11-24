import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { DialogsWrap } from "./Messages/DialogsWrap";
import { Profile } from "./Profile/Profile";

type propsType = {
    dialogsPage: dialogsPageType
    profilePage: profilePageType
    dispatch: any
}

export const Main = (props: propsType) => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile profilePage={props.profilePage}
                                                    dispatch={props.dispatch}
                                                     />} />
        <Route path="/dialogs" render={() => <DialogsWrap dialogsPage={props.dialogsPage}
                                                    dispatch={props.dispatch} />} />
    </div>
}