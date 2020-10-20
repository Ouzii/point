import React from 'react'

type CanvasProps = {
    width: number
    height: number
    children: React.ReactNode
    onClick: any
}
export default ({ width, height, children, onClick }: CanvasProps) => {
    return (
        <div style={{ width: width, height: height, position: 'relative', backgroundColor: 'lightgray', top: 20 }} onClick={onClick}>
            {children}
        </div>
    )
}

