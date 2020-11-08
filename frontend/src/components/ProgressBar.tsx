import React from 'react'
import { AMOUNT_OF_TASKS } from '../config/settings'

type ProgressBarProps = {
    progress: number
}
export default ({ progress }: ProgressBarProps) => {
    return (
        <div style={{
            position: 'absolute', top: 5, width: 200, height: 20, border: '1px black solid'
        }}>
            <div style={{
                height: '100%',
                width: `${Math.round((progress / AMOUNT_OF_TASKS) * 100)}%`,
                backgroundColor: 'lightgreen',
                borderRadius: 'inherit',
            }} />
            <span style={{}}>{Math.round((progress / AMOUNT_OF_TASKS) * 100)}%</span>
        </div>
    )
}