import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import { usersReducer } from "./users-reducer";
import thunk from "redux-thunk";
import { appReducer } from "./app-reducer";
import { asideReducer } from "./aside-reducer";
import { chatReducer } from "./chat-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    aside: asideReducer,
    chat: chatReducer
});

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store

export default store