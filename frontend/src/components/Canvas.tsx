import React, { Children } from 'react'

type CanvasProps = {
    width: number
    height: number
}
export default ({ width, height }: CanvasProps) => {
    return (
        <div style={{ width: width, height: height, position: 'relative' }}>
            {Children}
        </div>
    )
}

