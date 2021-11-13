import React from "react";
import s from "./Profile.module.css";

export const Profile = () => {
    return (
        <div className={s.profileContainer}>
            <div className={s.mainPhoto}>
                <img src="https://images.ctfassets.net/hrltx12pl8hq/72HS9gzO2aIo6Ew7f82gmY/ea51b9e5e3549a9844f75c0cf58aec7e/05-nature_1487897981.jpg?fit=fill&w=480&h=270" alt="Nature" />
            </div>
            <div className={s.mainInfoContainer}>
            <div className={s.ava}>
                ava + description
            </div>
            <div className={s.posts}>
                <h3>My posts</h3>
                <input type="text" />
                <div>post 1</div>
                <div>post 2</div>
            </div>
        </div>
        </div>
    )
}