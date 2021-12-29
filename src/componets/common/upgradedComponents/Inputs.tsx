import Reat from "react"
import s from "../../Login/Login.module.css"

export const Input = ({field, form, ...rest}: any) => {
    
    const name = field.name
    const hasError = form.errors[name] && form.touched[name]
    
    return (
        <div>
            <input  className={hasError ? s.errorInput : s.loginInput}
             {...field} {...rest} />
            {hasError && <div className={s.errorMessage}>{form.errors[name]}</div>}
        </div>
    )
}