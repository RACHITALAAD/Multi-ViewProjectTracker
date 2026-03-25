import React, { useState, useEffect } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import TaskCard from '../Card/TaskCard'

export default function DragLayer() {
    const draggedTaskId = useTaskStore(s => s.draggedTaskId)
    const tasks = useTaskStore(s => s.tasks)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const draggedTask = tasks.find(t => t.id === draggedTaskId)

    useEffect(() => {
        if (!draggedTaskId) return

        const handlePointerMove = (e: PointerEvent) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            })
        }

        window.addEventListener('pointermove', handlePointerMove)
        return () => window.removeEventListener('pointermove', handlePointerMove)
    }, [draggedTaskId])

    if (!draggedTask || !draggedTaskId) return null

    return (
        <div
            className="drag-ghost fixed pointer-events-none"
            style={{
                left: `${mousePos.x - 80}px`,
                top: `${mousePos.y - 40}px`,
                width: '160px',
            }}
        >
            <TaskCard task={draggedTask} />
        </div>
    )
}