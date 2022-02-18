import Reat from "react"
import s from "../input/Input.module.css"

export const InputFormik = ({field, form, ...rest}: any) => {
    
    const name = field.name
    const hasError = form.errors[name] && form.touched[name]
    
    return (
        <div>
            <div className={s.inputWrap}>
                <input className={s.input + " " + (hasError ? s.errorInput : "")}
                {...field} {...rest} />
            </div>
            {hasError && <div className={s.errorMessage}>{form.errors[name]}</div>}
        </div>
        
    )
}