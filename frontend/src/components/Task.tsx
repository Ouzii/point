import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import TimeGuesser from './TimeGuesser'
import Timer from '../funtionalComponents/Timer'
import LocalDataHandler from '../functions/LocalDataHandler'
import Countdown from './Countdown'
import STEP from '../config/enums'
import { CANVAS_SIZE } from '../config/settings'

type TaskProps = {
    coords: Array<{ x: number, y: number, width: number }>
    nextStep: () => void
    training?: boolean
}

const timer = Timer(false)
// Task logic for regular task
// coords = set of coordinates to draw a circle to.
// nextStep = callback for advancing steps in app
// training = boolean for if the current task is a training task
export default ({ coords, nextStep, training }: TaskProps) => {
    // Used for keeping track of progress and advancing within task
    const [circleNumber, setCircleNumber] = useState(STEP.COORDS.COORDS1)

    // Used for starting timer for task
    const [mouseOver, setMouseOver] = useState(false)

    // Used for keeping track of state within task
    const [taskStarted, setTaskStarted] = useState(false)
    const [taskOngoing, setTaskOngoing] = useState(true)

    // Used to save user's clicks while task ongoing
    const [clicks, setClicks] = useState<Array<{ x: number, y: number, hitCircle: boolean, time: number }>>([])

    // Used to determine the offset of next circle from the given coordinates based on the position of click on last circle
    const [lastClickOffsets, setLastClickOffsets] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    // Reset state between tasks
    useEffect(() => {
        setCircleNumber(STEP.COORDS.COORDS1)
        setLastClickOffsets({ x: 0, y: 0 })
        setTaskOngoing(true)
        setTaskStarted(false)
        setMouseOver(false)
        timer.reset(false)
        setClicks([])
    }, [coords])

    // Save clicks to localStorage
    useEffect(() => {
        LocalDataHandler.setItem('clicks', clicks)
    }, [clicks])

    // Handle clicking the circle
    const clickCircle = (e: MouseEvent) => {
        e.stopPropagation()
        let times
        // If last circle in task, stop the timer
        if (circleNumber >= 7) {
            times = timer.endTimer()
        }
        // Save the last click
        setLastClickOffsets({ x: lastClickOffsets.x - ((coords[circleNumber].x + lastClickOffsets.x) - (e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2))), y: lastClickOffsets.y - ((coords[circleNumber].y + lastClickOffsets.y) - (Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)))) })
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: true, time: times && circleNumber >= 7 ? times[times.length - 1] - times[0] : timer.getCurrentTime() }])

        // if not the last circle, show next one
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            if (!times) return
            // Save the times to localStorage
            LocalDataHandler.setItem('time', times[times.length - 1] - times[0])
            LocalDataHandler.setItem('times', timer.getTimeDifferences())
            // Set the task to be done and show input view
            setTaskOngoing(false)
        }
    }

    // Handle user clicking the canvas instead of the circle
    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        taskOngoing && setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: false, time: timer.getCurrentTime() }])
    }

    // Start the task after countdown done
    const startTask = () => {
        setTaskStarted(true)
        timer.startTimer()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            {training && <h2 style={{ position: 'absolute', top: 30 }}>HARJOITUS</h2>}
            {taskStarted ?
                // show canvas if task started
                <Canvas width={CANVAS_SIZE} height={CANVAS_SIZE} onClick={onMissClick}>
                    {taskOngoing ?
                        <Circle width={coords[circleNumber].width} x={coords[circleNumber].x + lastClickOffsets.x} y={coords[circleNumber].y + lastClickOffsets.y} onClick={clickCircle} />
                        :
                        <TimeGuesser nextStep={() => nextStep()} />
                    }
                </Canvas>
                // Show countdown if task not started
                : <div style={{ width: 90, height: 90, backgroundColor: "lightgray", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>{mouseOver ? <Countdown onCountdownDone={() => startTask()} /> : 'Pidä kursori tässä'}</div>}
        </div>
    )
}
