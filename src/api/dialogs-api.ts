import { instance } from "./api"

export const dialogsAPI = {
    getDialogs() {
        return instance.get(`dialogs`)
    },
    getDialogMessages(dialogId: number) {
        return instance.get(`dialogs/${dialogId}/messages`)
    }
}

export type dialogMessageType = {
    id: number
    body: string
    translatedBody: string | null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}