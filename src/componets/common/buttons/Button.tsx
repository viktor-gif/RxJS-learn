import React from "react";
import s from "./Button.module.css"

type propsType = {
    value: string
    click?: () => void
    buttonType: string
    disabled?: boolean
}

export const Button: React.FC<propsType> = (props: propsType) => {

    return <button className={s.button + ' ' + s[props.buttonType]} onClick={props.click}>
            {props.value}
        </button>
    
}