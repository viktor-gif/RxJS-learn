
import { Dispatch } from "redux"
import { chatAPI, chatMessageAPIType, statusType } from "../api/chat-api"
import { chatMessageType } from "../componets/Main/Chat/Chat"
import { chatType } from "./store"
import { v1 } from "uuid"

const UPDATE_MESSAGES = 'Viktor-gif/chat/UPDATE_MESSAGES'
const REMOVE_MESSAGES = 'Viktor-gif/chat/REMOVE_MESSAGES'
const SET_STATUS = 'Viktor-gif/chat/SET_STATUS'

const initialState = {
    messages: null as chatMessageType[] | null,
    status: "pending" as statusType
}

export const chatReducer = (state: chatType = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_MESSAGES:
            action.messages && console.log(...action.messages)
            return {
                ...state,
                messages: state.messages 
                    ? [...state.messages, ...action.newMessages.map((m: any) => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100 )
                    : [...action.newMessages.map((m: any) => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100 )
            }
            
        case REMOVE_MESSAGES:
            return {
                ...state,
                messages: null
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default: return state
    }
}

export const updateMessages = (newMessages: chatMessageAPIType[]) => ({type: UPDATE_MESSAGES, newMessages})
export const setStatus = (status: statusType) => ({type: SET_STATUS, status})
export const removeChatMessages = () => ({type: REMOVE_MESSAGES})

// new messages from WebSocket (chat)
let _newMessageHandler: ((messages: chatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    
    if (_newMessageHandler === null) {
        
        _newMessageHandler = (messages) => {
            dispatch(updateMessages(messages))
        }
    }
    return _newMessageHandler
}

let _changeStatusHandler: ((status: statusType) => void) | null = null
const changeStatusHandlerCreator = (dispatch: Dispatch) => {
    
    if (_changeStatusHandler === null) {
        
        _changeStatusHandler = (status) => {
            dispatch(setStatus(status))
        }
    }
    return _changeStatusHandler
}

// redux-thunk
export const startMessagesListening = () => async(dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", changeStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = () => (dispatch: any) => {
    
    chatAPI.stop()
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", changeStatusHandlerCreator(dispatch))
    dispatch(removeChatMessages())
}
export const sendMessage = (message: string) => (dispatch: any) => {
    
    chatAPI.sendMessage(message)
}