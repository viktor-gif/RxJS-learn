import React from "react"
import s from "./Error.module.css"

type propsType = {
    errorText: string

    openedErrorWindow: (close: boolean) => void
}

export const CommonError = (props: propsType) => {
    return <div className={s.errorText}>
        {props.errorText}
        <div onClick={() => props.openedErrorWindow(false)} className={s.closeErrorWindow}></div>
    </div>
}