export type User = {
    id: number
    age: number
    inputDevice: string
    gender: string
    tasks: Task[]
    step?: number
}

export type Task = {
    id: number
    iod: number
    compare: boolean
    time: number
    userTime: number
    compareTime: number
    compareIod: number
    userValue: number
    clicks: Click[]
}

export type Click = {
    id: number
    time: number
    x: number
    y: number
    ball: boolean
    ballX: number
    ballY: number
}