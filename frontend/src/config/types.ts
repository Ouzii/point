export type Session = {
    id: number
    user: User
    tasks: Task[]
    clicks: Click[]
    step: number
}

export type User = {
    age: number
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