import { useEffect, useRef } from 'react'

function AvatarCanvas({ name }: { name: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (canvas && ctx) {
            const width = canvas.width
            const height = canvas.height
            ctx.clearRect(0, 0, width, height)

            ctx.beginPath()
            ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fillStyle = '#1677ff'
            ctx.fill()

            const initial = name.charAt(0).toUpperCase()
            ctx.font = 'bold 20px sans-serif'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(initial, width / 2, height / 2)
        }
    }, [name])

    return (
        <canvas
            ref={canvasRef}
            width={40}
            height={40}
            style={{
                borderRadius: '50%',
            }}
        ></canvas>
    )
}

export default AvatarCanvas
