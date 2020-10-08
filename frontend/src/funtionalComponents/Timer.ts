export default (startNow: boolean) => {

    let startTime: number = startNow ? new Date().getMilliseconds() : 0;

    const times: number[] = [startTime]

    const startTimer = () => {
        startTime = new Date().getMilliseconds()
    }
    const saveTime = () => {
        times.push(new Date().getMilliseconds())
    }

    const endTimer = () => {
        times.push(new Date().getMilliseconds())
        return times
    }

    const getStartTime = () => {
        return startTime
    }

    const getTimes = () => {
        return times
    }

    return {
        saveTime,
        endTimer,
        startTimer,
        getStartTime,
        getTimes
    }
}