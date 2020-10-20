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
    compareTime: number | null | undefined
    compareIod: number | null | undefined
    userValue: number | null | undefined
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