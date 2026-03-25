import React, { useRef } from 'react'
import { Task, Status } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import { formatDueDate, isOverdue, isDueSoon } from '../../utils/filterSort'
import UserAvatar from '../Avatar/UserAvatar'
import CollaborationAvatars from '../Avatar/CollaborationAvatars'

type User = {
    id: string
    name: string
    avatar?: string
}

type Collaboration = {
    taskId: string
    userId: string
}

interface Props {
    task: Task
    columnStatus?: Status
}

const priorityColors = {
    Critical: 'bg-red-700 text-white',
    High: 'bg-red-400 text-white',
    Medium: 'bg-yellow-400 text-gray-900',
    Low: 'bg-green-400 text-gray-900',
}

const selectUsers = (state: any) => state.users
const selectDraggedTaskId = (state: any) => state.draggedTaskId
const selectSetDraggedTaskId = (state: any) => state.setDraggedTaskId
const selectSetDraggedTaskInitialStatus = (state: any) => state.setDraggedTaskInitialStatus
// const selectSetDragOverColumn = (state: any) => state.setDragOverColumn
const selectCollaborations = (state: any) => state.collaborations

export default function TaskCard({ task, columnStatus }: Props) {
    const cardRef = useRef<HTMLDivElement>(null)

    const users = useTaskStore(selectUsers)
    const draggedTaskId = useTaskStore(selectDraggedTaskId)
    const setDraggedTaskId = useTaskStore(selectSetDraggedTaskId)
    const setDraggedTaskInitialStatus = useTaskStore(selectSetDraggedTaskInitialStatus)
    // const setDragOverColumn = useTaskStore(selectSetDragOverColumn)
    const collaborations = useTaskStore(selectCollaborations).filter((c: Collaboration) => c.taskId === task.id)

    const assignee = users.find((u: User) => u.id === task.assigneeId)
    const overdue = isOverdue(task.dueDate)
    const dueSoon = isDueSoon(task.dueDate)
    const isDragging = draggedTaskId === task.id

    function handlePointerDown(e: React.PointerEvent) {
        if ((e.target as HTMLElement)?.tagName === 'BUTTON') return

        setDraggedTaskId(task.id)
        setDraggedTaskInitialStatus(task.status)
        e.preventDefault()
    }

    return (
        <div
            ref={cardRef}
            onPointerDown={handlePointerDown}
            className={`task-card bg-white rounded-lg p-3 mb-2 border-l-4 cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 ring-2 ring-blue-400' : ''}
        ${overdue && !isDragging ? 'border-l-red-600 bg-red-50' : 'border-l-gray-200'}
        hover:shadow-md transition`}
        >
            <div className="flex items-start justify-between mb-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                <span className={`text-xs font-medium ${overdue ? 'text-red-600' : dueSoon ? 'text-orange-600' : 'text-gray-500'}`}>
                    {formatDueDate(task.dueDate)}
                </span>
            </div>

            <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">{task.title}</h3>

            <div className="flex items-center justify-between">
                <UserAvatar user={assignee} size="sm" />
                <CollaborationAvatars collaborators={collaborations} maxDisplay={2} />
            </div>

            {columnStatus && (
                <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {task.status}
                </div>
            )}
        </div>
    )
}