import { Click, User, Task } from '../util/types'

// Parse input/output
const parse = (input: string | object | null) => {
    if (input === null || input === undefined) {
        return null
    } else if (typeof input === 'string') {
        return JSON.parse(input)
    } else if (typeof input === 'object' || typeof input === 'number' || Array.isArray(input)) {
        return JSON.stringify(input)
    } else {
        return null
    }
}

// Reset the localStorage
export const clearLocalStorage = () => {
    window.localStorage.clear()
}

// Check if user session is still open. DEPRECATED
export const isUserSessionAlive = (): number | boolean => {
    const user = getLocalData()
    return user ? user.id : false
}

// Get all user data
export const getLocalData = (): User => {
    return parse(window.localStorage.getItem('userData'))
}

// Set new user data
export const setLocalData = (data: User | null): void => {
    window.localStorage.setItem('userData', parse(data))
}

// Get item with key
export const getItem = (key: string): any => {
    return parse(window.localStorage.getItem(key))
}

// Set item to key
export const setItem = (key: string, data: any): void => {
    window.localStorage.setItem(key, parse(data))
}

// Add one new input to user data. DEPRECATED
export const updateLocalSavedData = (newInput: object): void => {
    const localData = getLocalData()
    const updatedData = { ...localData, ...newInput }
    setLocalData(updatedData)
}

// Add new task to user data. DEPRECATED
export const addNewTaskData = (newTaskData: Task): void => {
    const localData = getLocalData()
    localData.tasks = [...localData.tasks, newTaskData]
    setLocalData(localData)
}

// Add new clicks to user data. DEPRECATED
export const addNewClickData = (NewClickData: Click, task: number): void => {
    const localData = getLocalData()
    localData.tasks[task].clicks = [...localData.tasks[task].clicks, NewClickData]
    setLocalData(localData)
}

export const resetShortTimeValues = () => {
    window.localStorage.removeItem('guessedTime')
    window.localStorage.removeItem('time')
    window.localStorage.removeItem('time1')
    window.localStorage.removeItem('time2')
    window.localStorage.removeItem('compareValue')
    window.localStorage.removeItem('clicks')
}

export default {
    getItem,
    setItem,
    updateLocalSavedData,
    getLocalData,
    setLocalData,
    isUserSessionAlive,
    addNewTaskData,
    addNewClickData,
    resetShortTimeValues
}
