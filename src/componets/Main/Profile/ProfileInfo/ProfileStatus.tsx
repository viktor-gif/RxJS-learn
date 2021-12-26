import React, { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type profileInfoPropsType = {
    status: string | null
    userId: number
    setStatus: (status: string, userId: number) => void
}

export const ProfileStatus = React.memo((props: profileInfoPropsType) => {

    console.log(props.status)

    const [editMode, setEditMode] = useState(false)
    const [statusText, setStatusText] = useState(props.status || '')

    useEffect(() => {
        props.status && setStatusText(props.status)
    }, [props.status])

    const submitStatus = () => {
        props.setStatus(statusText, props.userId)
        setEditMode(false)
    }

    const submitStatusByEnterPress = (e: any) => {
        if (e.charCode === 13) {
            submitStatus()
        }
    }

    const onStatusChange = (e: any) => {
        setStatusText(e.target.value)
    }

    return (
        
        <div className={s.profileStatus}>
            {editMode ? <input type="text" value={statusText} autoFocus
                onKeyPress={submitStatusByEnterPress}
                onChange={onStatusChange}
                onBlur={submitStatus} /> 
                : <span onDoubleClick={() => setEditMode(true)}>
                    {props.status ? props.status : '-------------------'}
                </span>}
            
        </div> 
        
    )
})