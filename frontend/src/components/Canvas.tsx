import React from 'react'

type CanvasProps = {
    width: number
    height: number
    children: React.ReactNode
    onClick: any
}
// Canvas for circles to be drawn on
// width = width of the canvas in pixels
// height = height of the canvas in pixels
// children = children components
// onClick = callback for clicking the canvas
export default ({ width, height, children, onClick }: CanvasProps) => {
    return (
        <div style={{ width: width, height: height, position: 'relative', backgroundColor: 'lightgray' }} onClick={onClick}>
            {children}
        </div>
    )
}

