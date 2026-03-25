import React from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { applyFilters } from '../../utils/filterSort'
import KanbanColumn from './KanbanColumn'
// import EmptyState from '../EmptyState/EmptyState'
import DragLayer from '../DragLayer/DragLayer'
import { Status } from '../../types'

const COLUMNS: Status[] = ['To Do', 'In Progress', 'In Review', 'Done']

export default function BoardView() {
    const tasks = useTaskStore(s => s.tasks)
    const filters = useTaskStore(s => s.filters)
    const dragOverColumn = useTaskStore(s => s.dragOverColumn)
    // const setDragOverColumn = useTaskStore(s => s.setDragOverColumn)

    const filteredTasks = applyFilters(tasks, filters)

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <>
            <div
                className="flex-1 flex gap-4 px-6 pb-4 overflow-x-auto bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {COLUMNS.map((status) => {
                    const columnTasks = filteredTasks.filter(t => t.status === status)
                    return (
                        <KanbanColumn
                            key={status}
                            status={status}
                            tasks={columnTasks}
                            isDropZoneActive={dragOverColumn === status}
                        />
                    )
                })}
            </div>
            <DragLayer />
        </>
    )
}