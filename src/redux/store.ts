
import { statusType } from "../api/chat-api";
import { dialogMessageType } from "../api/dialogs-api";
import { chatMessageType } from "../componets/Main/Chat/Chat";
import { profileReducer } from "./profile-reducer";
import { sidebarReducer } from "./sidebar-reducer";


export type dialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    photos: photosType
};
export type dialogsType = Array<dialogType> | null;
export type dialogsPageType = {
    dialogs: dialogsType
    dialogMessages: dialogMessageType[] | null,
    currentDialogId: number | null,
    isViewedMessage: boolean
};


export type messageType = {id: number, isMe: boolean, message: string};
export type messagesType = Array<messageType>;
export type postType = {id: number, postText: string, likesCount: number, avaUrl: string};
export type postsType = Array<postType>;
export type usersType = Array<userType> | null;
export type userType = {
    id: number
    name: string
    followed: boolean
    status: string | null
    photos: {small: string | null, large: string | null}
    uniqueUrlName: string | null
}
export type usersPageType = {
    users: usersType
    usersCount: number | null
    pageSize: number,
    currentPage: number
    term: string
    isFriend: boolean
    inProgress: boolean,
    followingInProgress: boolean
    followingInProgressUsersId: number[]
}

export type profilePageType = {
    posts: postsType, postText: string,
    status: string | null,
    profileInfo: profileInfoType | null
};
export type profileInfoType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: contactsType
    photos: photosType
} | null
export type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type photosType = {
    small: string | null
    large: string | null
}
export type authType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
    ownerProfileInfo: profileInfoType | null
    errorMessage: string
}
export type appType = {
    initialized: boolean
    isOpendChat: boolean
}
export type asideType = {
    friends: usersType;
    totalFriendsCount: number
}
export type chatType = {
    messages: chatMessageType[] | null
    status: statusType
}
export type stateType = {
    dialogsPage: dialogsPageType, 
    profilePage: profilePageType, 
    usersPage: usersPageType
    sidebar: any
    auth: authType
    app: appType
    aside: asideType
    chat: chatType
};
export type storeType = {
    _state: stateType,
    _callSubscriber: () => void,
    getState: () => stateType,
    subscribe: (subscriber: () => void) => void,
    dispatch: any,
};

export const store: storeType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    userName: 'skdkd',
                    hasNewMessages: false,
                    lastDialogActivityDate: 'string',
                    lastUserActivityDate: 'kfsddf',
                    photos: {
                        small: "sksskfjds",
                        large: "kdsfssd"
                    }
                }
            ],
            dialogMessages: null,
            currentDialogId: null,
            isViewedMessage: false
        },
        
        profilePage: {
            posts: [
                {id: 1, postText: "Hello! how are you?", likesCount: 48, avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
                {id: 2, postText: "This is my post.", likesCount: 23, avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
                {id: 3, postText: "Never underastimate me!", likesCount: 8, avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"},
                {id: 4, postText: "Bla-bla", likesCount: 129, avaUrl: "https://occ-0-2433-448.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRkq_94V9dYhgOknDbPT9UlnSpLe_wu4KFFNzSeJYRkXPJRFuhZccaJHNhMoAgXwVecjxudZztCYhNuL7nM3Id3VuDny.jpg?r=960"}
            ],
            postText: "",
            status: "",
            profileInfo: null
        },
        usersPage: {
            users: [
                {
                    id: 1, 
                    name: 'Viktor',
                    followed: false,
                    status: 'I am a boss!',
                    photos: {small: null, large: null},
                    uniqueUrlName: null
                },
                {
                    id: 2, 
                    name: 'Olia',
                    followed: true,
                    status: 'I am a boss!',
                    photos: {small: null, large: null},
                    uniqueUrlName: null
                },
                {
                    id: 3, 
                    name: 'Youlia',
                    followed: false,
                    status: 'I am a boss!',
                    photos: {small: null, large: null},
                    uniqueUrlName: null
                },
                {
                    id: 4, 
                    name: 'Pavel',
                    followed: true,
                    status: 'I am a boss!',
                    photos: {small: null, large: null},
                    uniqueUrlName: null
                }
            ],
            usersCount: null,
            pageSize: 10,
            currentPage: 1,
            term: '',
            isFriend: false,
            inProgress: false,
            followingInProgress: false,
            followingInProgressUsersId: [],
        },
        sidebar:{},
        auth: {
            id: null,
            email: null,
            login: null,
            isAuth: false,
            captchaUrl: null,
            ownerProfileInfo: null,
            errorMessage: ''
        },
        
        app: {
            initialized: false,
            isOpendChat: false
        },
        aside: {
            friends: null,
            totalFriendsCount: 0
        },
        chat: {
            messages: null,
            status: 'pending'
        }
    },
    _callSubscriber: () => {
        alert("Hello!");
    },

    getState: () => {
            return store._state
    },
    subscribe: (subscriber) => {
        store._callSubscriber = subscriber;
    },
    dispatch: (action: any) => {
        // dialogsReducer(store.getState().dialogsPage, action)
        profileReducer(store.getState().profilePage, action)
        sidebarReducer(store.getState().sidebar, action)
        store._callSubscriber()
    },
}
