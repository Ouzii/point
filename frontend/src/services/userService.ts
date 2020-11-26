import axios, { AxiosResponse } from 'axios'
import { User } from '../util/types'
import { BASE_PATH } from '../config/settings'

// Get user by id
export const getUser = async (id: number): Promise<User | null> => {
    try {
        const res: AxiosResponse<User> = await axios.get(`${BASE_PATH}/users/${id}`)
        return res.data
    } catch (e) {
        console.log('Error getting user: ' + e)
        return null
    }
}

// Create new user skeleton
export const newUser = async (): Promise<User | null> => {
    try {
        const res: AxiosResponse<User> = await axios.post(`${BASE_PATH}/users`)

        return res.data
    } catch (e) {
        console.log('Osku antaa jalomielisyydessään teille käyttäjän jos lopetatte väärinkäytökset: ' + e)
        return null

    }
}

// Add data to user
export const updateUser = async (data: { id: number, age: string, gender: string, inputDevice: string }): Promise<User | null> => {
    try {
        const res: AxiosResponse<User> = await axios.post(`${BASE_PATH}/user_details`, data)
        return res.data
    } catch (e) {
        console.log('Error updating user: ' + e)
        return null
    }
}

export default {
    getUser,
    newUser
}