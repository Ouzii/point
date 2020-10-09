import axios, { AxiosResponse } from 'axios'
import { Session } from '../config/types'

import { BASE_PATH } from '../config/path'

export const getSession = async (id: number): Promise<Session | null> => {
    try {
        const res: AxiosResponse<Session> = await axios.get(`${BASE_PATH}/session/${id}`)
        return res.data
    } catch (e) {
        console.log('Error getting session: ' + e)
        return null
    }
}

export const newSession = async (): Promise<Session | null> => {
    try {
        const res: AxiosResponse<Session> = await axios.post(`${BASE_PATH}/session`)
        return res.data
    } catch (e) {
        console.log('Osku antaa jalomielisyydessään teille session jos lopetatte väärinkäytökset: ' + e)
        return null

    }
}

export default {
    getSession
}