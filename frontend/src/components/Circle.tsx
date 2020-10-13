import React from 'react'

type CircleProps = {
    width: number
    x: number
    y: number
}
export default ({ width, x, y }: CircleProps) => {
    return (
        <div style={{ borderRadius: '50%', width: width, position: 'absolute', top: y - (width / 2), left: x - (width / 2) }} />
    )
}
