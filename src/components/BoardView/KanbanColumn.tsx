import React, { useRef } from 'react'
import { Task, Status } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import TaskCard from '../Card/TaskCard'
import EmptyState from '../EmptyState/EmptyState'
import { getPointerPosition, isWithinElement } from '../../utils/dragUtils'

interface Props {
    status: Status
    tasks: Task[]
    isDropZoneActive: boolean
}

export default function KanbanColumn({ status, tasks, isDropZoneActive }: Props) {
    const columnRef = useRef<HTMLDivElement>(null)

    const draggedTaskId = useTaskStore(s => s.draggedTaskId)
    // const draggedTaskInitialStatus = useTaskStore(s => s.draggedTaskInitialStatus)
    const setDragOverColumn = useTaskStore(s => s.setDragOverColumn)
    const updateTask = useTaskStore(s => s.updateTask)
    const setDraggedTaskId = useTaskStore(s => s.setDraggedTaskId)

    function handlePointerMove(e: React.PointerEvent) {
        if (!draggedTaskId || !columnRef.current) return

        const coord = getPointerPosition(e)
        if (isWithinElement(coord, columnRef.current)) {
            setDragOverColumn(status)
        }
    }

    function handlePointerLeave() {
        if (draggedTaskId) {
            setDragOverColumn(undefined)
        }
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (!draggedTaskId || !columnRef.current) return

        const coord = getPointerPosition(e)
        if (isWithinElement(coord, columnRef.current)) {
            // Drop is valid
            updateTask(draggedTaskId, { status })
            setDraggedTaskId(undefined)
            setDragOverColumn(undefined)
        }
    }

    return (
        <div
            ref={columnRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerUp}
            className={`flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-sm flex flex-col transition ${isDropZoneActive ? 'drop-zone-active' : ''
                }`}
        >
            {/* Column Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
                <h3 className="font-semibold text-gray-800">{status}</h3>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-xs font-bold text-gray-700">
                    {tasks.length}
                </span>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 overflow-y-auto p-3 min-h-[100px]">
                {tasks.length === 0 ? (
                    <EmptyState type="column" columnName={status} />
                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} columnStatus={status} />
                    ))
                )}
            </div>
        </div>
    )
}