
export const getDistanceOfTwoCoordinates = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const getTimeDifference = (time1: number, time2: number) => {
    return Math.abs(time2 - time1)
}


export default {
    getDistanceOfTwoCoordinates,
    getTimeDifference
}