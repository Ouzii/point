import React from 'react'

type CircleProps = {
    width: number
    x: number
    y: number
    onClick: any
}
// Circle to be drawn on canvas
// width = width of the circle
// x = x coordinate of the circle on canvas
// y = y coordinate of the circle on canvas
// onClick = callback for clicking the ball
export default ({ width, x, y, onClick }: CircleProps) => {
    return (
        <div style={{ borderRadius: '50%', width: width, height: width, position: 'absolute', top: y - (width / 2), left: x - (width / 2), backgroundColor: "red" }} onClick={onClick} />
    )
}
