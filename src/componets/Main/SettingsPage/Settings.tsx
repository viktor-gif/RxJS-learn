import React from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { SettingsUsers } from "./SettingsPagesItems/SettingsUsers";
import s from "./Settings.module.css"

type settingsPropsType = {
    pageSize: number
    setPageSize: (size: number) => void
}

export const Settings = (props: settingsPropsType) => {
    return (
        <div className={s.setWrap}>
            <div className={s.setLinks}>
                <NavLink  className={s.setLink} to="/settings/users"><div>Users-settings</div></NavLink>
            </div>
            <div className={s.setPages}>
                <Route path="/settings/users" render={() => <SettingsUsers
                    pageSize={props.pageSize}
                    setPageSize={props.setPageSize} />} />
            </div>
        </div>
        
    )
}