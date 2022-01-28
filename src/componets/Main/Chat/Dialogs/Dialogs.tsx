import React, { useEffect } from "react"
import { dialogsType } from "../../../../redux/store"
import s from "./Dialogs.module.css"
import avaMale from "../../../../img/ava_male.jpeg";
import { useDispatch } from "react-redux";
import { startMessagesListening, stopMessagesListening } from "../../../../redux/chat-reducer";
import { dialogsPageActions, updateOrAddDialog } from "../../../../redux/dialogs-reducer";


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
        dispatch(dialogsPageActions.cleanDialogMessages())
        dispatch(startMessagesListening())
    }

    return (
        <div className={s.dialogsWrap}>
                <div className={s.commonChatBtn}>
                    <button onClick={getChatMessages}>Common chat</button>
                </div>
            {dialogsItems}
        </div>
    )
})

export const Dialog = React.memo((props: dialogPropsType) => {

    const dispatch = useDispatch()
    
    const getDialogMessages = () => {
        dispatch(stopMessagesListening())
        props.getDialogMessages(props.id)
        dispatch(dialogsPageActions.setDialogId(props.id))
        dispatch(updateOrAddDialog(props.id))
    }

    return (
        <div className={s.dialog}>
            <div className={s.avatar} onClick={getDialogMessages}>
                <img src={props.url || avaMale} alt="User" />
            </div>
            <div className={s.userName}>{props.name.slice(0, 5) + "..."}</div>
        </div>
    )
})

export default Dialogs


