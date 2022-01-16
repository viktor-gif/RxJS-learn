import axios from "axios"
import { profileInfoTypeWithoutPhotos } from "../componets/Main/Profile/ProfileInfo/ProfileInfo"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646"
    }
})

export const authAPI = {
    getAuthData() {
        return instance.get('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        console.log(captcha)
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

export const usersAPI = {
    getUsers(pageSize: number, pageNumber: number = 1, term: string = '', isFriend: boolean = false) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}&term=${term}&friend=${isFriend}`)
    },
    followPost(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    followDelete(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    savePhoto(photoFile: File) {
        const photoData = new FormData();
        photoData.append("image", photoFile)

        return instance.put(`profile/photo/`, photoData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    updateProfileInfo(profileInfo: profileInfoTypeWithoutPhotos) {
        return instance.put(`profile`, profileInfo)
    },
    setStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    getProfileData(userId: number) {
        return instance.get(`profile/${userId}`)
    }
}

export const dialogsAPI = {
    getDialogs() {
        return instance.get(`dialogs`)
    }
}