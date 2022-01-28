import { instance } from "./api"

export const dialogsAPI = {
    getDialogs() {
        return instance.get(`dialogs`)
    },
    getDialogMessages(dialogId: number) {
        return instance.get(`dialogs/${dialogId}/messages`)
    },
    sendDialogMessage(message: string, dialogId: number) {
        return instance.post(`dialogs/${dialogId}/messages`, {body: message})
    },
    updateOrAddDialog(userId: number) {
        return instance.put(`dialogs/${userId}`)
    },
    deleteMessage(id: number | string) {
        return instance.delete(`dialogs/messages/${id}`)
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