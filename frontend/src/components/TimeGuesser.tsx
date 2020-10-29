import React, { useState } from 'react'
import LocalDataHandler from '../functions/LocalDataHandler'
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
            LocalDataHandler.setItem('guessedTime', guessedTime)
            setTimerOn(false)
            nextStep()
        } else {
            timer.startTimer()
            setTimerOn(true)
        }
    }

    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Kauanko tehtävässä kesti? Klikkaa aloita, ja kun tehtävään kulunut aika on mielestäsi kulunut, klikkaa lopeta.</h2>
            <button onClick={buttonClick} style={{ height: 100, width: 300, fontSize: 30 }}>{timerOn ? 'Lopeta' : 'Aloita'}</button>
        </div>
    )
}
