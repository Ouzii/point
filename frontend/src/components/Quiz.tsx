import React from 'react'

type QuizProps = {
    nextStep: () => void
}
export default ({ nextStep }: QuizProps) => {
    return (
        <div>
            <button onClick={nextStep}>Jatka</button>
        </div>
    )
}