import axios from "axios"

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
    }
}

export const usersAPI = {
    getUsers(pageSize: number, pageNumber: number = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`)
    },
    followPost(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    followDelete(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getStatus(userId: number) {
        return instance.get(`status/${userId}`)
    },
    getProfileData(userId: number) {
        return instance.get(`profile/${userId}`)
    }
}