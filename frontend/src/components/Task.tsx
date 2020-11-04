import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import TimeGuesser from './TimeGuesser'
import Timer from '../funtionalComponents/Timer'
import LocalDataHandler from '../functions/LocalDataHandler'
import Countdown from './Countdown'
import STEP from '../config/enums'
import { CANVAS_SIZE } from '../config/settings'
import { createLogicalAnd } from 'typescript'

type TaskProps = {
    coords: Array<any>
    nextStep: () => void
    training?: boolean
}

const timer = Timer(false)

export default ({ coords, nextStep, training }: TaskProps) => {

    const [circleNumber, setCircleNumber] = useState(STEP.COORDS.COORDS1)
    const [mouseOver, setMouseOver] = useState(false)
    const [taskStarted, setTaskStarted] = useState(false)
    const [taskOngoing, setTaskOngoing] = useState(true)
    const [clicks, setClicks] = useState<Array<{ x: number, y: number, hitCircle: boolean, time: number }>>([])
    const [lastClickOffsets, setLastClickOffsets] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        setCircleNumber(STEP.COORDS.COORDS1)
        setLastClickOffsets({ x: 0, y: 0 })
        setTaskOngoing(true)
        setTaskStarted(false)
        setMouseOver(false)
        timer.reset(false)
        setClicks([])
    }, [coords])

    useEffect(() => {
        LocalDataHandler.setItem('clicks', clicks)
    }, [clicks])

    const clickCircle = (e: MouseEvent) => {
        e.stopPropagation()
        let times
        if (circleNumber >= 7) {
            times = timer.endTimer()
        }
        setLastClickOffsets({ x: lastClickOffsets.x - ((coords[circleNumber].x + lastClickOffsets.x) - (e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2))), y: lastClickOffsets.y - ((coords[circleNumber].y + lastClickOffsets.y) - (Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)))) })
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: true, time: times && circleNumber >= 7 ? times[times.length - 1] - times[0] : timer.getCurrentTime() }])
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            if (!times) return
            LocalDataHandler.setItem('time', times[times.length - 1] - times[0])
            LocalDataHandler.setItem('times', timer.getTimeDifferences())

            setTaskOngoing(false)
        }
    }

    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        taskOngoing && setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: false, time: timer.getCurrentTime() }])
    }

    const startTask = () => {
        setTaskStarted(true)
        timer.startTimer()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            {training && <h2 style={{ position: 'absolute', top: 30 }}>HARJOITUS</h2>}
            {taskStarted ?
                <Canvas width={CANVAS_SIZE} height={CANVAS_SIZE} onClick={onMissClick}>
                    {taskOngoing ?
                        <Circle width={coords[circleNumber].width} x={coords[circleNumber].x + lastClickOffsets.x} y={coords[circleNumber].y + lastClickOffsets.y} onClick={clickCircle} />
                        :
                        <TimeGuesser nextStep={() => nextStep()} />
                    }
                </Canvas>
                : <div style={{ width: 90, height: 90, backgroundColor: "lightgray", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>{mouseOver ? <Countdown onCountdownDone={() => startTask()} /> : 'Pidä kursori tässä'}</div>}
        </div>
    )
}
