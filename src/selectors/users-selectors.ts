import { stateType } from "../redux/store"
import { createSelector} from "reselect"

export const getUsersSel = (state: stateType) => {
    return state.usersPage.users
}

// @ts-ignore
export const getUsersRes = createSelector(getUsersSel, (users) => {
    // @ts-ignore
    return users && users.filter(u => true)
})