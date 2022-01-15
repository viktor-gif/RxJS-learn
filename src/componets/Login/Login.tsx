import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { stateType } from "../../redux/store"
import s from "./Login.module.css"
import {login, logout} from "../../redux/auth-reducer"
import {Formik, Form, Field} from "formik"
import { validatioInputs } from "../../utils/validators/validators"
import { Input } from "../common/upgradedComponents/Inputs"

type loginPropsType = {
    isAuth: boolean
    errorMessage: string
    captchaUrl: string | null

    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    logout: () => void
}

const Login = (props: loginPropsType) => {
    
    return <div className={s.loginWrap}>
        {!props.isAuth ? 
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: null
            }}
            onSubmit={(val) => {
                props.login(val.email, val.password, val.rememberMe, val.captcha)
            }}
            >
            
            {({ errors, touched, validateField, validateForm }) => (
                
                <Form>
                    
                    <div className={s.inputItem}>
                        <label className={s.loginLabel} htmlFor="email">E-mail:
                            <Field
                            type="email" id="email" component={Input}
                            name="email" placeholder="Email" validate={validatioInputs} />
                        </label>
                    </div>
                    <div className={s.inputItem}>
                        <label className={s.loginLabel} htmlFor="password">Password:
                            <Field
                            type="password" id="password" component={Input}
                            name="password" placeholder="Password" validate={validatioInputs} />
                        </label>
                    </div>
                    <div className={s.inputItem}>
                        <label className={s.loginLabel} htmlFor="rememberMe">Remember me:
                            <Field className={s.loginInput + " " + s.loginInputCheckbox} 
                            type="checkbox" id="rememberMe" name="rememberMe" component='input'/>
                        </label>
                    </div>
                    {props.captchaUrl && 
                        <div className={s.captchaBlock}>
                            <img src={props.captchaUrl} alt="captcha" />
                            <label className={s.loginLabel} htmlFor="email">
                                <Field
                                type="text" id="captcha" component={Input}
                                name="captcha" placeholder="Enter symbols from image" />
                            </label>
                        </div>
                    }
                    <div className={s.commonErrorMessage}>{props.errorMessage}</div>
                    
                    <button type="submit">submit</button>
                </Form>
            )}
        </Formik>
        
        : <button onClick={() => props.logout()}>Log out</button>}
    </div>
}

const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth,
    errorMessage: state.auth.errorMessage,
    captchaUrl: state.auth.captchaUrl
})

// const Login = (props: loginPropsType) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [rememberMe, setRememberMe] = useState(false)
//     const [isTouched, setTouched] = useState(false)

//     const touchInput = () => {
//         setTouched(true)
//     }

//     let localError = (value: string) => {
//         let errorMessage
//         if (!value.length || value.length === 0) {
//             errorMessage = 'Field is required'
//         } else if (value.length < 4) {
//             errorMessage = 'Min length is 4 symbols'
//         } else if (value.length > 30) {
//             errorMessage = 'Max length is 30 symbols'
//         }
//         return errorMessage
//     }

//     let localErrorEmailMessage = localError(email)

//     let localErrorPasswordMessage = localError(password)
    

//     const emailChange = (e: any) => {
//         setEmail(e.target.value)
//     }
//     const passwordChange = (e: any) => {
//         setPassword(e.target.value)
//     }
//     const rememberMeChange = (e: any) => {
//         setRememberMe(e.target.checked)
//     }


//     const hasEmailError = localErrorEmailMessage && isTouched
//     const hasPasswordError = localErrorPasswordMessage && isTouched

//     return <div className={s.loginWrap}>
//         {!props.isAuth ? 
//         <div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="email">E-mail:
//                     <input className={hasEmailError ? s.errorInput : s.loginInput}
//                     type="email" id="email"
//                     value={email} onChange={emailChange}
//                     onClick={touchInput} />
//                 </label>
//                 {hasEmailError && <div className={s.errorMessage}>{localErrorEmailMessage}</div>}
//             </div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="password">Password:
//                     <input className={hasPasswordError ? s.errorInput : s.loginInput}
//                     type="password" id="password"
//                     value={password} onChange={passwordChange}
//                     onClick={touchInput} />
//                 </label>
//                 {hasPasswordError && <div className={s.errorMessage}>{localErrorPasswordMessage}</div>}
//             </div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="rememberMe">Remember me:
//                     <input onChange={rememberMeChange} className={s.loginInput + " " + s.loginInputCheckbox} 
//                     type="checkbox" id="rememberMe"/>
//                 </label>
//             </div>

//             <div className={s.commonErrorMessage}>{props.errorMessage}</div>
            
//             <button onClick={() => props.login(email, password,rememberMe)}>submit</button>
//         </div>
//         : <button onClick={() => props.logout()}>Log out</button>}
//     </div>
// }

export default connect(mapStateToProps, {login, logout})(Login)