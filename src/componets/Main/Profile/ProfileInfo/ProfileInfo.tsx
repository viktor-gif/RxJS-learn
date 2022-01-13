import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import ava from "../../../../img/ava_male.jpeg";
import { profileInfoType } from "../../../../redux/store";
import { Preloader } from "../../../common/preloader/preloader";
import { ProfileStatus } from "./ProfileStatus";
import downLoadIcon from "../../../../img/profile/icons/download_button.png"
//@ts-ignore
import croppie from "croppie"

console.log(croppie)

type profileInfoPropsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
    isOwner: boolean

    setStatus: (status: string, userId: number) => void
    savePhoto: (photo: File) => void
}

export const ProfileInfo = (props: profileInfoPropsType) => {
    const [isChosenFile, setChosenFile] = useState(false)

    let info: profileInfoType = props.profileInfo
    let contacts = info && Object.entries(info?.contacts)
    const contactsItems = contacts && contacts.map(c => {
        return <li key={c[0]} className={s.contactItem}><span>{
                c[0][0].toUpperCase() + c[0].slice(1)
            }</span>: {c[1]}</li>
    })

    const savePhoto = (e: any) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        
        <div className={s.profileInfoContainer}>
            {!props.userId ? <Preloader /> : 
            <div>
                    {props.isAuth ? <div>
                    <div className={s.ava}>
                        <img src={info?.photos.large || ava} alt="My_ava" />
                        {props.isOwner && <div className={s.inputFile}>
                            <input type="file" id="input-file"
                            onChange={savePhoto} />
                            <label htmlFor="input-file" className={s.inputButton}>
                                <span className={s.inputButtonIcon}>
                                    <img src={downLoadIcon} alt="DL" />
                                </span>
                                <span className={s.inputButtonText}>
                                    {isChosenFile ? "Файл выбран" : "Выберите файл"}
                                </span>
                            </label>
                        </div>}
                    </div>
                    <ProfileStatus status={props.status} setStatus={props.setStatus} userId={props.userId} />
                    <div className={s.description}>
                        <div className={s.profileInfoItem}><span>id</span>: {info?.userId}</div>
                        <div className={s.profileInfoItem}><span>User-name</span>: {info?.fullName}</div>
                        <div className={s.profileInfoItem}><span>About me</span>: {info?.aboutMe}</div>
                        <div className={s.profileInfoItem}><span>Look for a job</span>: {
                            info?.lookingForAJob ? "Yes" : "no"
                        }</div>
                        <div className={s.profileInfoItem}><span>Look for a job (description)</span>: {
                            info?.lookingForAJobDescription
                        }</div>
                        <ul className={s.contactsListWrap}>
                            <li className={s.contactsTitle}>Contacts:</li>
                            <ul className={s.contactsList}>
                                {contactsItems}
                            </ul>
                        </ul>
                    </div>
                </div> 
                : <div>YOU ARE NOT AUTHORIZED</div>}
            </div>
            
            }
            
        </div>
    )
}