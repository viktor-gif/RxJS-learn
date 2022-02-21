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
            <h2 className={s.setTitle}>Settings</h2>
            <div className={s.contentWrap}>
                <div className={s.setLinks}>
                    <NavLink activeClassName={s.activeLink} className={s.setLink} to="/settings/users">
                        <div className={s.linkTextWrap}>
                            Users-settings
                        </div>
                    </NavLink>
                    <NavLink activeClassName={s.activeLink} className={s.setLink} to="/settings/user">
                        <div className={s.linkTextWrap}>
                            Users-settings
                        </div>
                    </NavLink>
                </div>
                <div className={s.setPages}>
                    <Route path="/settings/users" render={() => <SettingsUsers
                        pageSize={props.pageSize}
                        setPageSize={props.setPageSize} />} />
                </div>
            </div>
            
        </div>
        
    )
}