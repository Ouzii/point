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
    coords: Array<Array<{ x: number, y: number, width: number }>>
    nextStep: () => void
    training?: boolean
}

const timer = Timer(false)
// Task logic for comparison task
// coords = set of coordinates to draw a circle to.
// nextStep = callback for advancing steps in app
// training = boolean for if the current task is a training task
export default ({ coords, nextStep, training }: ComparisonTaskProps) => {
    // Used for keeping track of progress and advancing within task
    const [circleNumber, setCircleNumber] = useState(COORDS.COORDS1)
    // Used for keeping count if task is A or B
    const [taskNumber, setTaskNumber] = useState(COMPARISON_TASK_NUMBER.FIRST)

    // Used for starting timer for task
    const [mouseOver, setMouseOver] = useState(false)

    // Used for keeping track of state within task
    const [taskStarted, setTaskStarted] = useState(false)
    const [taskOngoing, setTaskOngoing] = useState(true)

    // Used to save user's clicks while task ongoing
    const [clicks, setClicks] = useState<{ x: number, y: number, hitCircle: boolean, time: number }[]>([])

    // Used to determine the offset of next circle from the given coordinates based on the position of click on last circle
    const [lastClickOffsets, setLastClickOffsets] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    // Reset state between tasks
    useEffect(() => {
        setCircleNumber(COORDS.COORDS1)
        setTaskNumber(COMPARISON_TASK_NUMBER.FIRST)
        setTaskOngoing(true)
        setTaskStarted(false)
        setMouseOver(false)
        timer.reset(false)
        setClicks([])
    }, [coords])

    // Reset required states between tasks in a phase
    useEffect(() => {
        setMouseOver(false)
        setLastClickOffsets({ x: 0, y: 0 })
    }, [taskNumber])

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
        setLastClickOffsets({ x: lastClickOffsets.x - ((coords[taskNumber][circleNumber].x + lastClickOffsets.x) - (e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2))), y: lastClickOffsets.y - ((coords[taskNumber][circleNumber].y + lastClickOffsets.y) - (Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)))) })
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: true, time: times && circleNumber >= 7 ? times[times.length - 1] - times[0] : timer.getCurrentTime() }])

        // if not the last circle, show next one
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)

        } else {
            if (!times) return
            // Save the times to localStorage
            LocalDataHandler.setItem('time' + (taskNumber + 1), times[times.length - 1] - times[0])
            LocalDataHandler.setItem('times' + (taskNumber + 1), timer.getTimeDifferences())
            // Check if task was A or B. IF it was A, proceed to B. Else set task to be finished and show input view.
            if (taskNumber === COMPARISON_TASK_NUMBER.FIRST) {
                setCircleNumber(COORDS.COORDS1)
                setTaskStarted(false)
                setTaskNumber(1)
                timer.reset(false)
            } else {
                setTaskOngoing(false)
            }
        }
    }

    // Handle user clicking the canvas instead of the circle
    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - CANVAS_SIZE) / 2), y: Math.ceil(e.clientY - ((window.innerHeight - CANVAS_SIZE) / 2)), hitCircle: false, time: timer.getCurrentTime() }])
    }

    // Start the task after countdown done
    const startTask = () => {
        setTaskStarted(true)
        timer.startTimer()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column' }}>
            {training && <h2 style={{ position: 'absolute', top: 50, zIndex: 99 }}>HARJOITUS</h2>}
            <h1 style={{ position: 'absolute', top: 20, zIndex: 99 }}>{taskOngoing ? taskNumber === 0 ? 'A' : 'B' : ''}</h1>
            {taskStarted ?
                // show canvas if task started
                <Canvas width={CANVAS_SIZE} height={CANVAS_SIZE} onClick={onMissClick}>
                    {taskOngoing ?
                        <Circle width={coords[taskNumber][circleNumber].width} x={coords[taskNumber][circleNumber].x + lastClickOffsets.x} y={coords[taskNumber][circleNumber].y + lastClickOffsets.y} onClick={clickCircle} />
                        :
                        <TimeComparison nextStep={() => nextStep()} />
                    }
                </Canvas>
                // Show countdown if task not started
                : <div style={{ width: 90, height: 90, backgroundColor: "lightgray", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>{mouseOver ? <Countdown onCountdownDone={() => startTask()} /> : 'Pidä kursori tässä'}</div>}
        </div>
    )
}