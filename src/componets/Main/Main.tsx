import React  from "react";
import { Route } from "react-router-dom";
import { dialogsPageType, profilePageType } from "../../redux/store";
import s from "./Main.module.css";
import { Dialogs } from "./Messages/Dialogs";
import { Profile } from "./Profile/Profile";

type propsType = {
    dialogsPage: dialogsPageType
    profilePage: profilePageType
    addPost: (postText: string) => void
    updateNewPostText: (text: string) => void
}

export const Main = (props: propsType) => {
    return <div className={s.mainContainer}>
        <Route path="/profile" render={() => <Profile profilePage={props.profilePage}
                                                    addPost={props.addPost}
                                                    updateNewPostText={props.updateNewPostText}
                                                     />} />
        <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.dialogsPage} />} />
    </div>
}