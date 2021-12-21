import React from "react";
import s from "./ProfileInfo.module.css";
import ava from "../../../../img/ava_male.jpeg";
import { profileInfoType } from "../../../../redux/store";
import { Preloader } from "../../../preloader/preloader";

type profileInfoPropsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
}

export const ProfileInfo = (props: profileInfoPropsType) => {
    let info: profileInfoType = props.profileInfo
    let contacts = info && Object.entries(info?.contacts)
    const contactsItems = contacts && contacts.map(c => {
        return <li key={c[0]} className={s.contactItem}><span>{
                c[0][0].toUpperCase() + c[0].slice(1)
            }</span>: {c[1]}</li>
    })
    return (
        
        <div className={s.profileInfoContainer}>
            {!props.userId ? <Preloader /> : 
            <div>
                    {props.isAuth ? <div>
                    <div className={s.ava}>
                        <img src={info?.photos.large || ava} alt="My_ava" />
                    </div>
                    <div className={s.profileStatus}>{props.status ? props.status : '---------------------'}</div>
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
                : <div>YOU SRE NOT AUTHORIZED</div>}
            </div>
            
            }
            
        </div>
    )
}