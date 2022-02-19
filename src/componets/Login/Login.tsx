import React from "react"
import { connect } from "react-redux"
import { stateType } from "../../redux/store"
import s from "./Login.module.css"
import {login, logout} from "../../redux/auth-reducer"
import {Formik, Form, Field} from "formik"
import { validatioInputs } from "../../utils/validators/validators"
import { InputFormik } from "../common/inputFormik/InputFormik"
import { Button } from "../common/buttons/Button"
import { Checkbox } from "../common/checkbox/Checkbox"

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
                console.log(val)
            }}
            >
            
            {({ errors, touched, validateField, validateForm }) => (
                
                <Form>
                    <div className={s.inputItem}>
                        <label className={s.loginLabel} htmlFor="email">
                            <span className={s.fieldDescriotion}>E-mail:</span>
                            <Field
                            type="email" id="email" component={InputFormik}
                            name="email" placeholder="Email" validate={validatioInputs} />
                        </label>
                    </div>
                    <div className={s.inputItem}>
                        <label className={s.loginLabel} htmlFor="password">
                            <span className={s.fieldDescriotion}>Password:</span>
                            <Field
                            type="password" id="password" component={InputFormik}
                            name="password" placeholder="Password" validate={validatioInputs} />
                        </label>
                    </div>
                    <div className={s.inputItem}>
                        <span className={s.fieldDescriotion}>Remember me:</span>
                            <Field type="checkbox" id="rememberMe" name="rememberMe" 
                                component={Checkbox} />
                        
                    </div>
                    {props.captchaUrl && 
                        <div className={s.captchaBlock}>
                            <img src={props.captchaUrl} alt="captcha" />
                            <label className={s.loginLabel} htmlFor="email">
                                <Field
                                type="text" id="captcha" component={InputFormik}
                                name="captcha" placeholder="Enter symbols from image" />
                            </label>
                        </div>
                    }
                    <div className={s.commonErrorMessage}>{props.errorMessage}</div>
                    
                    <Button value="submit" buttonType="login" />
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