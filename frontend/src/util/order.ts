export default (id: number): Array<number> => {
    switch (id % 4) {
        case 0:
            return [0, 1, 2, 3]
        case 1:
            return [3, 2, 0, 1]
        case 2:
            return [2, 3, 1, 0]
        case 3:
            return [1, 0, 2, 3]
        default:
            return [0, 1, 2, 3]
    }
}