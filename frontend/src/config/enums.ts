export enum SET {
    WELCOME = 0,
    QUIZ,
    INFO1,
    SET1,
    SET2,
    INFO2,
    SET3,
    SET4,
    THANK_YOU
}

export enum PHASE {
    PHASE1 = 1,
    PHASE2,
    PHASE3,
    PHASE4,
    PHASE5,
    PHASE6,
}

export enum TASK {
    TASK1 = 0,
    TASK2,
    TASK3,
    TASK4
}

export enum COORDS {
    COORDS1 = 0,
    COORDS2,
    COORDS3,
    COORDS4,
    COORDS5,
    COORDS6,
    COORDS7,
    COORDS8,
}

export enum INFO_TYPE {
    TIME_GUESS = 0,
    TIME_COMPARISON
}

export enum COMPARISON_TASK_NUMBER {
    FIRST = 0,
    SECOND
}

export default {
    SET,
    PHASE,
    TASK,
    COORDS,
    INFO_TYPE,
    COMPARISON_TASK_NUMBER
}