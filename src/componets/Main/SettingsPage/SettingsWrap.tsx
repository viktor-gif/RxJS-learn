import React from "react"
import { connect } from "react-redux"
import { stateType } from "../../../redux/store"
import { Settings } from "./Settings"
import { setPageSize } from "../../../redux/users-reducer"

const mapStateToProps = (state: stateType) => ({
    pageSize: state.usersPage.pageSize
})

export const SettingsWrap = connect(mapStateToProps, {setPageSize})(Settings)