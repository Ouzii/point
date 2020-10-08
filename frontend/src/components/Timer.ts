import React from 'react'

export default () => {

    const startTime: number = new Date().getMilliseconds();

    const times: number[] = [startTime]

    const saveTime = () => {
        times.push(new Date().getMilliseconds())
    }

    const endTime = () => {
        times.push(new Date().getMilliseconds())
        return times
    }
}