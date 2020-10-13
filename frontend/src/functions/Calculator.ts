
export const getDistanceOfTwoCoordinates = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const getTimeDifference = (time1: number, time2: number): number => {
    return Math.abs(time2 - time1)
}

export const getIndexOfDifficulty = (distance: number, width: number): number => {
    return Math.log2((2 * distance) / width)
}

export const getDistanceForIndexOfDifficulty = (width: number, indexOfDifficulty: number): number => {
    return (Math.pow(indexOfDifficulty, 2) * width) / 2
}

export const getWidthForIndexOfDifficulty = (distance: number, indexOfDifficulty: number): number => {
    return (2 * distance) / Math.pow(indexOfDifficulty, 2)
}




// ID = log2(2D/W)
// ID^2 = 2D/W
// ID^2*W = 2D
// W = 2D/ID^2
// (ID^2*W)/2 = D

export default {
    getDistanceOfTwoCoordinates,
    getTimeDifference,
    getIndexOfDifficulty,
    getDistanceForIndexOfDifficulty,
    getWidthForIndexOfDifficulty
}