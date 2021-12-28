import React, { useState } from "react"
import { connect } from "react-redux"
import { stateType } from "../../redux/store"
import s from "./Login.module.css"
import {login, logout} from "../../redux/auth-reducer"
import {Formik, Form, Field} from "formik"

type loginPropsType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
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
            }}
            onSubmit={(val) => {
                console.log(val)
                props.login(val.email, val.password, val.rememberMe)
            }}
            >
            <Form>
                <div className={s.inputItem}>
                    <label className={s.loginLabel} htmlFor="email">E-mail:
                        <Field className={s.loginInput} type="email" id="email"
                        name="email" placeholder="Email" />
                    </label>
                </div>
                <div className={s.inputItem}>
                    <label className={s.loginLabel} htmlFor="password">Password:
                        <Field className={s.loginInput} type="password" id="password"
                        name="password" placeholder="Password" />
                    </label>
                </div>
                <div className={s.inputItem}>
                    <label className={s.loginLabel} htmlFor="rememberMe">Remember me:
                        <Field className={s.loginInput + " " + s.loginInputCheckbox} 
                        type="checkbox" id="rememberMe" name="rememberMe"/>
                    </label>
                </div>
                
                <button type="submit">submit</button>
            </Form>
        </Formik>
        
        : <button onClick={() => props.logout()}>Log out</button>}
    </div>
}

const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth
})

// const Login = (props: loginPropsType) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [rememberMe, setRememberMe] = useState(false)

//     const emailChange = (e: any) => {
//         setEmail(e.target.value)
//     }
//     const passwordChange = (e: any) => {
//         setPassword(e.target.value)
//     }
//     const rememberMeChange = (e: any) => {
//         setRememberMe(e.target.checked)
//     }

//     return <div className={s.loginWrap}>
//         {!props.isAuth ? 
//         <div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="email">E-mail:
//                     <input className={s.loginInput} type="email" id="email"
//                     value={email} onChange={emailChange} />
//                 </label>
//             </div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="password">Password:
//                     <input className={s.loginInput} type="password" id="password"
//                     value={password} onChange={passwordChange} />
//                 </label>
//             </div>
//             <div className={s.inputItem}>
//                 <label className={s.loginLabel} htmlFor="rememberMe">Remember me:
//                     <input onChange={rememberMeChange} className={s.loginInput + " " + s.loginInputCheckbox} 
//                     type="checkbox" id="rememberMe"/>
//                 </label>
//             </div>
            
//             <button onClick={() => props.login(email, password,rememberMe)}>submit</button>
//         </div>
//         : <button onClick={() => props.logout()}>Log out</button>}
//     </div>
// }

// const mapStateToProps = (state: stateType) => ({
//     isAuth: state.auth.isAuth
// })

export default connect(mapStateToProps, {login, logout})(Login)