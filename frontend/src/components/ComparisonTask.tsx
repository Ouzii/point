import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import Timer from '../funtionalComponents/Timer'
import LocalDataHandler from '../functions/LocalDataHandler'
import Countdown from './Countdown'
import { COORDS, COMPARISON_TASK_NUMBER } from '../config/enums'
import { CANVAS_SIZE } from '../config/settings'
import TimeComparison from './TimeComparison'

type ComparisonTaskProps = {
    coords: Array<any>
    nextStep: () => void
    training?: boolean
}

const timer = Timer(false)

export default ({ coords, nextStep, training }: ComparisonTaskProps) => {

    const [circleNumber, setCircleNumber] = useState(COORDS.COORDS1)
    const [taskNumber, setTaskNumber] = useState(COMPARISON_TASK_NUMBER.FIRST)
    const [mouseOver, setMouseOver] = useState(false)
    const [taskStarted, setTaskStarted] = useState(false)
    const [taskOngoing, setTaskOngoing] = useState(true)
    const [clicks, setClicks] = useState<{ x: number, y: number, hitCircle: boolean, time: number }[]>([])
    const [lastClickOffsets, setLastClickOffsets] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        setCircleNumber(COORDS.COORDS1)
        setTaskNumber(COMPARISON_TASK_NUMBER.FIRST)
        setTaskOngoing(true)
        setTaskStarted(false)
        setMouseOver(false)
        timer.reset(false)
        setClicks([])
    }, [coords])

    useEffect(() => {
        setMouseOver(false)
        setLastClickOffsets({ x: 0, y: 0 })
    }, [taskNumber])

    useEffect(() => {
        LocalDataHandler.setItem('clicks', clicks)
    }, [clicks])


    const clickCircle = (e: MouseEvent) => {
        e.stopPropagation()
        let times
        if (circleNumber >= 7) {
            times = timer.endTimer()
        }

        setLastClickOffsets({ x: lastClickOffsets.x - ((coords[taskNumber][circleNumber].x + lastClickOffsets.x) - (e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2))), y: lastClickOffsets.y - ((coords[taskNumber][circleNumber].y + lastClickOffsets.y) - (Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)))) })
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: true, time: times && circleNumber >= 7 ? times[times.length - 1] - times[0] : timer.getCurrentTime() }])

        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            if (!times) return

            LocalDataHandler.setItem('time' + (taskNumber + 1), times[times.length - 1] - times[0])
            LocalDataHandler.setItem('times' + (taskNumber + 1), timer.getTimeDifferences())
            if (taskNumber === COMPARISON_TASK_NUMBER.FIRST) {
                setCircleNumber(COORDS.COORDS1)
                setTaskStarted(false)
                setTaskNumber(1)
            } else {
                setTaskOngoing(false)
            }
        }
    }

    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: false, time: timer.getCurrentTime() }])
    }

    const startTask = () => {
        setTaskStarted(true)
        timer.startTimer()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column' }}>
            {training && <h2 style={{ position: 'absolute', top: 50, zIndex: 99 }}>HARJOITUS</h2>}
            <h1 style={{ position: 'absolute', top: 20, zIndex: 99 }}>{taskOngoing ? taskNumber === 0 ? 'A' : 'B' : ''}</h1>
            {taskStarted ?
                <Canvas width={CANVAS_SIZE} height={CANVAS_SIZE} onClick={onMissClick}>
                    {taskOngoing ?
                        <Circle width={coords[taskNumber][circleNumber].width} x={coords[taskNumber][circleNumber].x + lastClickOffsets.x} y={coords[taskNumber][circleNumber].y + lastClickOffsets.y} onClick={clickCircle} />
                        :
                        <TimeComparison nextStep={() => nextStep()} />
                    }
                </Canvas>
                : <div style={{ width: 90, height: 90, backgroundColor: "lightgray", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>{mouseOver ? <Countdown onCountdownDone={() => startTask()} /> : 'Pidä kursori tässä'}</div>}
        </div>
    )
}