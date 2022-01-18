import React from "react"
import { chatMessageType } from "../componets/Main/Messages/Dialogs"

let subscribers = [] as subscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(() => createChannel(), 3000)
}
const messageHandler = (e: MessageEvent) => {
    console.log(JSON.parse(e.data))
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))        
}
function createChannel() {
    cleanUp()
    ws =  new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}
function cleanUp() {
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}

export const chatAPI = {
    
    subscribe(callback: subscriberType) {
        subscribers.push(callback)
        // return () => {
        //     subscribers.filter(s => s !== callback)
        // }
    },
    unsubscribe(callback: subscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        cleanUp()
    },
}

export type subscriberType = ((messages: chatMessageType[]) => void)