import React, { useState } from 'react'
import LocalDataHandler from '../functions/LocalDataHandler'

type TimeGuesserProps = {
    nextStep: () => void
}
export default ({ nextStep }: TimeGuesserProps) => {

    const [slider, setSlider] = useState("0")

    const sliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlider(e.currentTarget.value)
    }

    const buttonClick = () => {
        LocalDataHandler.setItem('compareValue', slider)
        nextStep()
    }

    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Kumpi tehtävä meni nopeammin? Liikuta palloa nopeammin mennyttä tehtävää kohti niin paljon, kuin uskot tehtävän olleen helpompi (täysin vasen laita = tehtävä A oli huomattavasti helpompi)</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <h2>A</h2><input type="range" min="-100" max="100" value={slider} onChange={sliderChange} className="slider" /><h2>B</h2>
            </div>
            <button onClick={buttonClick}>Jatka</button>
        </div>
    )
}
