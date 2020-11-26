export type User = {
    id: number
    age: number
    inputDevice: string
    gender: string
    tasks: Array<Task | any>
    sets: [{ [phase: string]: Phase }, { [phase: string]: Phase }, { [phase: string]: Phase }, { [phase: string]: Phase }]
}

export type Phase = {
    tasks: Array<Task | any>
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
    clicks: Array<Click>
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

export type TaskData = {
    orderNumber: number
    iod: number
    modifier: string
    compare: boolean
    width: number
    distance: number
    time: number
    userTime: number
    compareTime: number | null
    compareIod: number | null
    compareWidth: number | null
    compareDistance: number | null
    userValue: number | null
    clicks: Array<Click>,
    userId: number
}