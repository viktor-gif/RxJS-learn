import React from "react"
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

export default connect(mapStateToProps, {login, logout})(Login)