import axios, { AxiosResponse } from 'axios'
import { BASE_PATH } from '../config/settings'

export const addTaskToUser = async (data: any): Promise<any | null> => {
    try {
        const res: AxiosResponse<any> = await axios.post(`${BASE_PATH}/tasks`, data)
        return res.data
    } catch (e) {
        console.log('Error saving task: ' + e)
        return null
    }
}

export default {
    addTaskToUser,
}