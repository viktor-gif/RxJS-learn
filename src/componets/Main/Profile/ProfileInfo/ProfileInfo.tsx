import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import ava from "../../../../img/ava_male.jpeg";
import { contactsType, profileInfoType } from "../../../../redux/store";
import { Preloader } from "../../../common/preloader/preloader";
import { ProfileStatus } from "./ProfileStatus";
import downLoadIcon from "../../../../img/profile/icons/download_button.png"
import {Formik, Form, Field} from "formik"

export type profileInfoTypeWithoutPhotos = {
    aboutMe: string | null
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: contactsType
} | null

type profileInfoPropsType = {
    status: string | null
    profileInfo: profileInfoType
    isAuth: boolean
    userId: number | null
    isOwner: boolean

    setStatus: (status: string, userId: number) => void
    savePhoto: (photo: File) => void
    updateProfileInfo: (setEdit: any, setErrorMessage: any, userId: number | null, profileInfo: profileInfoTypeWithoutPhotos) => void
    setOpenChat: (isOpen: boolean) => void
    updateOrAddDialog: (userId: number) => void
    getDialogMessages: (dialogId: number) => void

}

export const ProfileInfo = (props: profileInfoPropsType) => {
    const [isEdit, setEdit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let info: profileInfoType = props.profileInfo
    let contacts = info && Object.entries(info?.contacts)

    const contactsItems = contacts && contacts.map(c => {
        return <li key={c[0]} className={s.contactItem}><span>{
                c[0][0].toUpperCase() + c[0].slice(1)
            }</span>: {c[1]}</li>
    })

    const contactsItemsUpdate = contacts && contacts.map(c => {
        return <li key={c[0]} className={s.contactItem}><span>{
                c[0][0].toUpperCase() + c[0].slice(1)
            }</span>: 
                <Field component="input" type="text" placeholder={`Your ${c[0]}`}
                                            name={c[0]} id={c[0]} />
            </li>
    })

    const savePhoto = (e: any) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSendMessageClick = () => {
        props.setOpenChat(true)
        info && props.updateOrAddDialog(info.userId)
        info && props.getDialogMessages(info.userId)
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
                                    {"Выберите файл"}
                                </span>
                            </label>
                        </div>}
                    </div>

                    <ProfileStatus status={props.status} setStatus={props.setStatus} userId={props.userId} />
                    
                    {!isEdit ? 
                    <div className={s.description}>
                        <div className={s.profileInfoItem}><span>id</span>: {info?.userId}</div>
                        <div className={s.profileInfoItem}><span>User-name</span>: {info?.fullName}</div>
                        <div className={s.profileInfoItem}><span>About me</span>: {info?.aboutMe}</div>
                        <div className={s.profileInfoItem}><span>Look for a job</span>: {
                            info?.lookingForAJob ? "Yes" : "no"
                        }</div>
                        {info?.lookingForAJob && 
                        <div className={s.profileInfoItem}><span>Look for a job (description)</span>: {
                            info?.lookingForAJobDescription
                        }</div>
                        }
                        <ul className={s.contactsListWrap}>
                            <li className={s.contactsTitle}>Contacts:</li>
                            <ul className={s.contactsList}>
                                {contactsItems}
                            </ul>
                        </ul>
                        {props.isOwner 
                            ? <button onClick={() => setEdit(true)}>Edit profile info</button>
                            : <button onClick={onSendMessageClick}>Send message</button>}
                    </div>
                    :
                    <Formik
                        initialValues={{
                            fullName: info?.fullName || "",
                            aboutMe: info?.aboutMe || "",
                            lookingForAJob: info?.lookingForAJob,
                            lookingForAJobDescription: info?.lookingForAJobDescription || "",
                            facebook: info?.contacts.facebook || "",
                            website: info?.contacts.website || "",
                            vk: info?.contacts.vk || "",
                            twitter: info?.contacts.twitter || "",
                            instagram: info?.contacts.instagram || "",
                            youtube: info?.contacts.youtube || "",
                            github: info?.contacts.github || "",
                            mainLink: info?.contacts.mainLink || ""
                        }}
                        onSubmit={(val) => {
                            props.updateProfileInfo(setEdit, setErrorMessage, props.userId, {
                                userId: props.userId,
                                fullName: val.fullName,
                                aboutMe: val.aboutMe,
                                lookingForAJob: val.lookingForAJob || false,
                                lookingForAJobDescription: val.lookingForAJobDescription,
                                contacts: {
                                    facebook: val.facebook,
                                    github: val.github,
                                    instagram: val.instagram,
                                    mainLink: val.mainLink,
                                    twitter: val.twitter,
                                    vk: val.vk,
                                    website: val.website,
                                    youtube: val.youtube
                                }

                            })
                        }}
                        >
                        {({ errors, touched, validateField, validateForm }) => (
                            
                            <Form>
                                <div className={s.description}>
                                    <div className={s.profileInfoItem}><span>id</span>: {info?.userId}</div>
                                    <div className={s.profileInfoItem}><span>User-name</span>: 
                                        <Field component="input" type="text" placeholder="Your full name"
                                            name="fullName" id="fullName" />
                                    </div>
                                    <div className={s.profileInfoItem}><span>About me</span>: 
                                        <Field component="input" type="text" placeholder="Tell about yoursesf"
                                            name="aboutMe" id="aboutMe" />
                                    </div>
                                    <div className={s.profileInfoItem}><span>Look for a job</span>: 
                                        <Field component="input" type="checkbox"
                                            name="lookingForAJob" id="lookingForAJob" />
                                    </div>
                                    <div className={s.profileInfoItem}><span>Look for a job (description)</span>: 
                                        <Field component="textarea" type="text" placeholder="Descript your job"
                                            name="lookingForAJobDescription" id="userlookingForAJobDescription" />
                                    </div>
                                    <ul className={s.contactsListWrap}>
                                        <li className={s.contactsTitle}>Contacts:</li>
                                        <ul className={s.contactsList}>
                                            {contactsItemsUpdate}
                                        </ul>
                                    </ul>
                                </div>
                                <div className={s.editProfileErrorMessage}>{errorMessage}</div>
                                <button type="submit">Submit</button>
                            </Form>
                        )}
                        
                    </Formik>
                    }

                </div> 
                : <div>YOU ARE NOT AUTHORIZED</div>}
            </div>
            
            }
            
        </div>
    )
}