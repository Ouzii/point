import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import Circle from './Circle'
import tasks from '../util/tasks.json'
import TimeGuesser from './TimeGuesser'
import Timer from '../funtionalComponents/Timer'
import LocalDataHandler from '../functions/LocalDataHandler'

type TaskProps = {
    taskNumber: number
    nextStep: () => void
}
const timer = Timer(true)
export default ({ taskNumber, nextStep }: TaskProps) => {

    const [circleNumber, setCircleNumber] = useState(0)
    const [taskOngoing, setTaskOngoing] = useState(true)
    const [clicks, setClicks] = useState<{ x: number, y: number, hitCircle: boolean }[]>([])
    const task: { id: number, iod: number, compare: boolean, coords: { x: number, y: number, width: number }[] } = tasks[taskNumber]


    useEffect(() => {
        setCircleNumber(0)
        setTaskOngoing(true)
        timer.reset(true)
    }, [taskNumber])

    useEffect(() => {
        console.log(clicks)

    }, [clicks])

    const clickCircle = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - 900) / 2), y: e.clientY - 20, hitCircle: true }])
        if (circleNumber < 7) {
            timer.saveTime()
            setCircleNumber(circleNumber + 1)
        } else {
            const times = timer.endTimer()
            LocalDataHandler.setItem('time', times[times.length - 1] - times[0])
            LocalDataHandler.setItem('clicks', clicks)
            setTaskOngoing(false)
        }
    }


    const onMissClick = (e: MouseEvent) => {
        e.stopPropagation()
        setClicks([...clicks, { x: e.clientX - ((window.innerWidth - 900) / 2), y: e.clientY - 20, hitCircle: false }])
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Canvas width={900} height={900} onClick={onMissClick}>
                {taskOngoing ?
                    <Circle width={task.coords[circleNumber].width} x={task.coords[circleNumber].x} y={task.coords[circleNumber].y} onClick={clickCircle} />
                    :
                    <TimeGuesser nextStep={() => nextStep()} />
                }
            </Canvas>
        </div>
    )
}
