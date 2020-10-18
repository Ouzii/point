import React from 'react'

type CanvasProps = {
    width: number
    height: number
    children: React.ReactNode
}
export default ({ width, height, children }: CanvasProps) => {
    return (
        <div style={{ width: width, height: height, position: 'relative' }}>
            {children}
        </div>
    )
}

