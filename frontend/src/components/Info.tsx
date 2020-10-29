import React from 'react'
import { INFO_TYPE } from '../config/enums'

type InfoProps = {
    type: number
    nextStep: () => void
}
export default ({ type, nextStep }: InfoProps) => {

    const renderInfoText = () => {
        if (type === INFO_TYPE.TIME_GUESS) {
            return <div>Aikojen arvauksen info</div>
        } else if (type === INFO_TYPE.TIME_COMPARISON) {
            return <div>Aikojen vertailun info</div>
        }
    }

    return (
        <div style={{ marginTop: -300 }}>
            {renderInfoText()}
            <button onClick={() => nextStep()}>Jatka</button>
        </div>
    )
}