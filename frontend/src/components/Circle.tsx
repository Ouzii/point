import React from 'react'

type CircleProps = {
    width: number
    x: number
    y: number
    onClick: () => void
}
export default ({ width, x, y, onClick }: CircleProps) => {
    return (
        <div style={{ borderRadius: '50%', width: width, height: width, position: 'absolute', top: y - (width / 2), left: x - (width / 2), backgroundColor: "red" }} onClick={onClick} />
    )
}
