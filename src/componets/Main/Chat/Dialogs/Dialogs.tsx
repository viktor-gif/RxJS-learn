import React, { useEffect } from "react"
import { dialogsType } from "../../../../redux/store"
import s from "./Dialogs.module.css"
import avaMale from "../../../../img/ava_male.jpeg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startMessagesListening } from "../../../../redux/chat-reducer";


type dialogsPropsType = {
    dialogs: dialogsType

    getDialogs: () => void
    getDialogMessages: (dialogId: number) => void
}
type dialogPropsType = {
    id: number
    key: number
    url: string | null
    name: string
    getDialogMessages: (dialogId: number) => void
}



export const Dialogs = React.memo((props: dialogsPropsType) => {

    useEffect(() => {
        props.getDialogs()
    }, [])

    const dispatch = useDispatch()

    const dialogs = props.dialogs;

    const dialogsItems = dialogs?.map(d => {
        return <Dialog id={d.id} key={d.id} name={d.userName} url={d.photos.small} getDialogMessages={props.getDialogMessages} />
    })

    const getChatMessages = () => {
        dispatch(startMessagesListening())
    }

    return (
        <div className={s.dialogsWrap}>
            {/* <NavLink to="chat"> */}
                <div className={s.commonChatBtn}>
                    <button onClick={getChatMessages}>Common chat</button>
                </div>
            {/* </NavLink> */}
            {dialogsItems}
        </div>
    )
})

export const Dialog = React.memo((props: dialogPropsType) => {
    
    const getDialogMessages = () => {
        props.getDialogMessages(props.id)
    }

    return (
        <div className={s.dialog}>
            {/* <NavLink to="chat"> */}
            <div className={s.avatar} onClick={getDialogMessages}>
                <img src={props.url || avaMale} alt="User" />
            </div>
            <div className={s.userName}>{props.name}</div>
            {/* </NavLink> */}
        </div>
    )
})

export default Dialogs


