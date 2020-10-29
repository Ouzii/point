import React, { useEffect, useState } from 'react'

export default ({ onCountdownDone }: { onCountdownDone: () => void }) => {
    const [time, setTime] = useState<number>(3)

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
        }, 400)
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