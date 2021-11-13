import React  from "react";
import s from "./Main.module.css";
import { Messages } from "./Messages/Messages";
import { Profile } from "./Profile/Profile";

export const Main = () => {
    return <div className={s.mainContainer}>
        {/* <Profile /> */}
        <Messages />
    </div>
}