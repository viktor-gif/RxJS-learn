import React from "react"

let subscribers = {
    "messages-received": [] as messagesSubscriberType[],
    "status-changed": [] as statusSubscriberType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(() => createChannel(), 3000)
    subscribers["status-changed"].forEach(s => s("pending"))
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}
const openHandler = () => {
    subscribers["status-changed"].forEach(s => s("ready"))
}
const errorHandler = () => {
    console.log('ERROR<<<<<<')
    subscribers["status-changed"].forEach(s => s("error"))
}
function createChannel() {
    cleanUp()
    subscribers["status-changed"].forEach(s => s("pending"))
    ws =  new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('error', errorHandler)
    ws.addEventListener('open', openHandler)
}
function cleanUp() {
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

export const chatAPI = {
    
    subscribe(eventName: eventType, callback: messagesSubscriberType | statusSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: eventType,callback: messagesSubscriberType | statusSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
    },
}

export type messagesSubscriberType = ((messages: chatMessageAPIType[]) => void)
export type statusSubscriberType = ((status: statusType) => void)

export type eventType = "messages-received" | "status-changed"
export type statusType = "pending" | "ready" | "error"

export type chatMessageAPIType = {
    userId: number
    userName: string
    message: string
    photo: string | null
}