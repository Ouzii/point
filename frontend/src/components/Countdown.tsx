import React, { useEffect, useState } from 'react'
// Countdown component for starting a task
// onCountdownDone = callback for when countdown is finished
export default ({ onCountdownDone }: { onCountdownDone: () => void }) => {
    // Set the first number in countdown
    const [time, setTime] = useState<number>(10)

    const setNewTime = () => {
        if (time <= 1) {
            onCountdownDone()
        } else {
            setTime(time - 1)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNewTime()
            // Interval (ms) of number changes
        }, 150)
        return () => {
            clearTimeout(timer)
        }
    })

    return (
        <div style={{ pointerEvents: 'none', fontSize: 40 }}>
            {time}
        </div>
    )
}