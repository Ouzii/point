import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import tasks from '../util/tasks.json'
import TimeGuesser from './TimeGuesser'
import Timer from '../funtionalComponents/Timer'
import LocalDataHandler from '../functions/LocalDataHandler'
import Countdown from './Countdown'
import STEP from '../config/enums'

type TaskProps = {
    coords: any[]
    nextStep: () => void
}
const timer = Timer(false)

export default ({ coords, nextStep }: TaskProps) => {

    const [circleNumber, setCircleNumber] = useState(STEP.COORDS.COORDS1)
    const [mouseOver, setMouseOver] = useState(false)
    const [taskStarted, setTaskStarted] = useState(false)
    const [taskOngoing, setTaskOngoing] = useState(true)
    const [clicks, setClicks] = useState<{ x: number, y: number, hitCircle: boolean }[]>([])

    useEffect(() => {
        setCircleNumber(STEP.COORDS.COORDS1)
        setTaskOngoing(true)
        setTaskStarted(false)
        setMouseOver(false)
        timer.reset(false)
    }, [coords])

    const clickCircle = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - 900) / 2), y: e.clientY - 20, hitCircle: true }])
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            const times = timer.endTimer()

            LocalDataHandler.setItem('time', times[times.length - 1] - times[0])
            LocalDataHandler.setItem('times', timer.getTimeDifferences())
            LocalDataHandler.setItem('clicks', clicks)
            setTaskOngoing(false)
        }
    }

    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - 900) / 2), y: e.clientY - 20, hitCircle: false }])
    }

    const startTask = () => {
        setTaskStarted(true)
        timer.startTimer()
    }

    console.log(coords)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            {taskStarted ?
                <Canvas width={800} height={800} onClick={onMissClick}>
                    {taskOngoing ?
                        <Circle width={coords[circleNumber].width} x={coords[circleNumber].x} y={coords[circleNumber].y} onClick={clickCircle} />
                        :
                        <TimeGuesser nextStep={() => nextStep()} />
                    }
                </Canvas>
                : <div style={{ width: 90, height: 90, backgroundColor: "lightgray" }} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>{mouseOver ? <Countdown onCountdownDone={() => startTask()} /> : 'Pidä kursori tässä'}</div>}
        </div>
    )
}
