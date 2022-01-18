
import { Dispatch } from "redux"
import { chatAPI } from "../api/chat-api"
import { chatMessageType } from "../componets/Main/Messages/Dialogs"
import { chatType } from "./store"

const UPDATE_MESSAGES = 'Viktor-gif/chat/UPDATE_MESSAGES'

const initialState = {
    messages: [] as chatMessageType[]
}

export const chatReducer = (state: chatType = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.newMessages]
            }
        default: return state
    }
}

export const updateMessages = (newMessages: chatMessageType[]) => ({type: UPDATE_MESSAGES, newMessages})

// new messages from WebSocket (chat)
let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(updateMessages(messages))
        }
    }
    return _newMessageHandler
}

// redux-thunk
export const startMessagesListening = () => async(dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = () => (dispatch: any) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}
export const sendMessage = (message: string) => (dispatch: any) => {
    chatAPI.sendMessage(message)
}