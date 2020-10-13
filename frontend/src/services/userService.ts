import axios, { AxiosResponse } from 'axios'
import { User } from '../config/types'
import { BASE_PATH } from '../config/path'

export const getUser = async (id: number): Promise<User | null> => {
    try {
        const res: AxiosResponse<User> = await axios.get(`${BASE_PATH}/users/${id}`)
        return res.data
    } catch (e) {
        console.log('Error getting user: ' + e)
        return null
    }
}

export const newUser = async (): Promise<User | null> => {
    try {
        const res: AxiosResponse<User> = await axios.post(`${BASE_PATH}/users`)

        return { ...res.data, step: 0 }
    } catch (e) {
        console.log('Osku antaa jalomielisyydessään teille käyttäjän jos lopetatte väärinkäytökset: ' + e)
        return null

    }
}

export default {
    getUser,
    newUser
}