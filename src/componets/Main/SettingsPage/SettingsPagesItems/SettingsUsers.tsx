import React, { ChangeEvent, useState } from "react"
import { Button } from "../../../common/buttons/Button"
import { Input } from "../../../common/input/Input"
import s from "./SettingsUsers.module.css"

type propsType = {
    pageSize: number
    setPageSize: (size: number) => void
}

export const SettingsUsers = (props: propsType) => {
    const [isEditState, setEditState] = useState(false)
    const [pageSizeTemp, setPageSizeTemp] = useState(props.pageSize)

    const submitChanges = () => {
        props.setPageSize(pageSizeTemp)
        setEditState(false)
    }

    const changeNumberOfUsersInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPageSizeTemp(+e.target.value)
    }

    return (
        <div className={s.usersSetWrap}>
            <h3 className={s.usersSetTitle}>Users-settings</h3>
            <div className={s.usersSetContent}>
                {!isEditState ? <div className={s.currentValueBlock}>
                        Number users in one page: <span className={s.currentValue}>{props.pageSize}</span>
                    </div>
                :
                    <div className={s.editSetBlock}>
                        <span className={s.editSetText}>Enter number users in one page (from 1 to 100):</span>
                        <Input onChange={changeNumberOfUsersInputChangeHandler}
                            value={pageSizeTemp} placeholder="Enter number of users"
                            inputTypeStyle="usersSettings" type="number" />
                    </div>}
            </div>
            <div className={s.usersSetButtons}>
                {!isEditState ? 
                    <Button buttonType="settings" click={() => setEditState(true)} value="Edit settings" />
                    : <Button buttonType="settings" click={submitChanges} value="Submit" />
                }
            </div>
            
        </div>
    )
}
