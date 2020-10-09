import { Session } from '../config/types'

const parse = (input: string | object | null) => {
    if (typeof input === 'string') {
        return JSON.parse(input)
    } else if (typeof input === 'object') {
        return JSON.stringify(input)
    } else {
        return null
    }
}

export const isSessionAlive = (): number | boolean => {
    const session = getLocalData()
    return !!session ? session.id : false
}

export const getLocalData = (): Session => {
    return parse(window.localStorage.getItem('sessionData'))
}

export const setLocalData = (data: Session): void => {
    window.localStorage.setItem('sessionData', parse(data))
}

export const getItem = (key: string): object => {
    return parse(window.localStorage.getItem(key))
}

export const setItem = (key: string, data: object): void => {
    window.localStorage.setItem(key, parse(data))
}

export const updateLocalSavedData = (newInput: object): void => {
    const localData = getLocalData()
    // TODO: how the hell are we gonna structure the local data?
    const updatedData = { ...localData, ...newInput }
    setLocalData(updatedData)
}

export default {
    getItem,
    setItem,
    updateLocalSavedData,
    getLocalData,
    setLocalData,
    isSessionAlive
}
