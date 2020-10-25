export default (startNow: boolean) => {

    let startTime: number = startNow ? new Date().getTime() : 0;

    let times: number[] = startNow ? [startTime] : []

    const startTimer = () => {
        startTime = new Date().getTime()
        times.push(startTime)
    }
    const saveTime = () => {
        times.push(new Date().getTime())
    }

    const endTimer = () => {
        times.push(new Date().getTime())
        return times
    }

    const getStartTime = () => {
        return startTime
    }

    const getTimes = () => {
        return times
    }

    const getTimeDifferences = () => {
        return times.map(time => {
            return time - times[0]
        })
    }

    const reset = (startNow: boolean) => {
        times = []
        if (startNow) {
            startTime = new Date().getTime()
            times.push(startTime)
        }
    }

    return {
        saveTime,
        endTimer,
        startTimer,
        getStartTime,
        getTimes,
        reset,
        getTimeDifferences
    }
}