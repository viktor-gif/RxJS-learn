import { dialogsPageType } from "./store";


const ADD_MESSAGE = "ADD_MESSAGE"
const MESSAGE_TEXT_CHANGE = "MESSAGE_TEXT_CHANGE"

export const dialogsReducer = (state: dialogsPageType, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let messages = state.messages;
            let random = Math.random();
            messages.push({
                id: messages[messages.length - 1].id + 1,
                isMe: random < 0.5 ? true : false,
                message: state.newMessageText
            })
            state.newMessageText = "";
            return state
        case MESSAGE_TEXT_CHANGE:
            state.newMessageText = action.text;
            return state
        default: return state
    }
}

export const dialogsPageActions = {
    addMessage: () => ({type: ADD_MESSAGE}),
    updateMessageText: (text: string) => ({type: MESSAGE_TEXT_CHANGE, text})
}
