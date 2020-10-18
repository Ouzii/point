import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import tasks from '../util/tasks.json'
import TimeGuesser from './TimeGuesser'
import Timer from '../funtionalComponents/Timer'

type TaskProps = {
    taskNumber: number
    nextStep: () => void
}
const timer = Timer(true)
export default ({ taskNumber, nextStep }: TaskProps) => {

    const [circleNumber, setCircleNumber] = useState(0)
    const [taskOngoing, setTaskOngoing] = useState(true)
    const task: { x: number, y: number, width: number }[] = tasks[taskNumber]


    useEffect(() => {
        setCircleNumber(0)
        setTaskOngoing(true)
        timer.reset(true)
    }, [taskNumber])

    const clickCircle = () => {
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            const times = timer.endTimer()
            // TODO: save times
            setTaskOngoing(false)
        }
    }





    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Canvas width={900} height={900}>
                {taskOngoing ?
                    <Circle width={task[circleNumber].width} x={task[circleNumber].x} y={task[circleNumber].y} onClick={() => clickCircle()} />
                    :
                    <TimeGuesser nextStep={() => nextStep()} />
                }
            </Canvas>
        </div>
    )
}
