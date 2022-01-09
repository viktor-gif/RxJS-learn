
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { sidebarReducer } from "./sidebar-reducer";

export type dialogType = {id: number, name: string, sex: string, url: string};
export type dialogsType = Array<dialogType>;
export type messageType = {id: number, isMe: boolean, message: string};
export type messagesType = Array<messageType>;
export type postType = {id: number, postText: string, likesCount: number, avaUrl: string};
export type postsType = Array<postType>;
export type usersType = Array<userType> | null;
type userType = {
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
export type dialogsPageType = {
    dialogs: dialogsType, 
    messages: messagesType,
    newMessageText: string
};
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
    errorMessage: string
}
export type appType = {
    initialized: boolean
}
export type asideType = {
    friends: usersType;
    totalFriendsCount: number
}
export type stateType = {
    dialogsPage: dialogsPageType, 
    profilePage: profilePageType, 
    usersPage: usersPageType
    sidebar: any
    auth: authType
    app: appType
    aside: asideType
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
                {id: 1, name: 'Viktor', sex: 'male', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_g_7YVzERozXI_mfnbSPkggiXqlljwtCQXw&usqp=CAU'},
                {id: 2, name: 'Olia', sex: 'female', url: 'data:image/jpeg;base64,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'},
                {id: 3, name: 'Youlia', sex: 'female', url: 'data:image/jpeg;base64,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'},
                {id: 4, name: 'Pavel', sex: 'male', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_g_7YVzERozXI_mfnbSPkggiXqlljwtCQXw&usqp=CAU'},
                {id: 5, name: 'Oleg', sex: 'male', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_g_7YVzERozXI_mfnbSPkggiXqlljwtCQXw&usqp=CAU'},
            ],
            messages: [
                {id: 1, isMe: true, message: "Hello! how are you?"},
                {id: 2, isMe: false, message: "I'm ok, and you?"},
                {id: 3, isMe: true, message: "Nice"},
                {id: 4, isMe: true, message: "What are you doing today?"},
                {id: 5, isMe: false, message: "Hothing. Let's go to walk!"}
            ],
            newMessageText: ""
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
            errorMessage: ''
        },
        app: {
            initialized: false
        },
        aside: {
            friends: null,
            totalFriendsCount: 0
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
        dialogsReducer(store.getState().dialogsPage, action)
        profileReducer(store.getState().profilePage, action)
        sidebarReducer(store.getState().sidebar, action)
        store._callSubscriber()
    },
}
