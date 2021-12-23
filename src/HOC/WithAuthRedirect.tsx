import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { stateType } from "../redux/store"

export const withAuthRedirect = (Component: any) => {
    const WithAuthRedirectComponent = (props: any) => {
        if (!props.isAuth) return <Redirect to="login" />
        return <Component {...props} />
    }

    const mapStateToProps = (state: stateType) => ({
        isAuth: state.auth.isAuth
    })

    return connect(mapStateToProps, {})(WithAuthRedirectComponent)
}