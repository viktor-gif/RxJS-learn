import React, { useState } from "react"
import s from "../Settings.module.css"

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

    return (
        <div className={s.usersSetWrap}>
            <h3 className={s.usersSetTitle}>Users-settings</h3>
            <div className={s.usersSetContent}>
                {!isEditState ? <div>
                    <div>
                        Number users in one page: {props.pageSize}
                    </div>
                </div> :
                <div>
                    <div>
                        Enter number users in one page (from 1 to 100): 
                        <input value={pageSizeTemp} onChange={(e) => setPageSizeTemp(+e.target.value) } type="number" />
                    </div>
                </div>}
            </div>
            <div className={s.usersSetButtons}>
                {!isEditState ? 
                    <button onClick={() => setEditState(true)}>Edit settings</button> 
                    : <button onClick={submitChanges}>Save settings</button>
                }
            </div>
            
        </div>
    )
}
