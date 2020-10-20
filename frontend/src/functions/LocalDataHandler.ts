import { Click, User, Task } from '../util/types'

const parse = (input: string | object | null) => {
    if (typeof input === 'string') {
        return JSON.parse(input)
    } else if (typeof input === 'object') {
        return JSON.stringify(input)
    } else {
        return null
    }
}

export const isUserSessionAlive = (): number | boolean => {
    const user = getLocalData()
    return !!user ? user.id : false
}

export const getLocalData = (): User => {
    return parse(window.localStorage.getItem('userData'))
}

export const setLocalData = (data: User): void => {
    window.localStorage.setItem('userData', parse(data))
}

export const getItem = (key: string): any => {
    return parse(window.localStorage.getItem(key))
}

export const setItem = (key: string, data: any): void => {
    window.localStorage.setItem(key, parse(data))
}

export const updateLocalSavedData = (newInput: object): void => {
    const localData = getLocalData()
    // TODO: how the hell are we gonna structure the local data?
    const updatedData = { ...localData, ...newInput }
    setLocalData(updatedData)
}

export const addNewTaskData = (newTaskData: Task): void => {
    const localData = getLocalData()
    localData.tasks = [...localData.tasks, newTaskData]
    setLocalData(localData)
}

export const addNewClickData = (NewClickData: Click, task: number): void => {
    const localData = getLocalData()
    localData.tasks[task].clicks = [...localData.tasks[task].clicks, NewClickData]
    setLocalData(localData)
}

export const setStep = (newStep: number): void => {
    const localData = getLocalData()
    localData.step = newStep
    setLocalData(localData)
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
    setStep
}
