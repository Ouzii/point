import React, { useState } from 'react'
import Timer from '../funtionalComponents/Timer'

const timer = Timer(false)

type TimeGuesserProps = {
    nextStep: () => void
}
export default ({ nextStep }: TimeGuesserProps) => {

    const [timerOn, setTimerOn] = useState(false)

    const buttonClick = () => {
        if (timerOn) {
            const times = timer.endTimer()
            const guessedTime = times[times.length - 1] - times[0]
            // TODO: use guessedTime
            setTimerOn(false)
            nextStep()
        } else {
            timer.startTimer()
            setTimerOn(true)
        }
    }

    return (
        <div>
            <button onClick={buttonClick}>{timerOn ? 'Lopeta' : 'Aloita'}</button>
        </div>
    )
}
