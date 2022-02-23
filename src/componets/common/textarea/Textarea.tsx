import React, { ChangeEvent } from "react";
import s from "../input/Input.module.css"

type propsType = {
    value?: string
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    type?: string
}

export const Textarea: React.FC<propsType> = (props: propsType) => {

    return <div className={s.inputWrap}>
                <textarea className={s.input}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    value={props.value}
                    ></textarea>
            </div>
    
}