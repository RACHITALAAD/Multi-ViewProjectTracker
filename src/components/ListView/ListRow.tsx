import { useState } from 'react'
import { Task, Status } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import { formatDueDate, isOverdue } from '../../utils/filterSort'
import UserAvatar from '../Avatar/UserAvatar'

interface Props {
    task: Task
}

const statusOptions: Status[] = ['To Do', 'In Progress', 'In Review', 'Done']
const priorityColors = {
    Critical: 'text-red-700 bg-red-50',
    High: 'text-red-600 bg-red-50',
    Medium: 'text-yellow-700 bg-yellow-50',
    Low: 'text-green-700 bg-green-50',
}

export default function ListRow({ task }: Props) {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)

    const updateTask = useTaskStore(s => s.updateTask)
    const users = useTaskStore(s => s.users)
    const assignee = users.find(u => u.id === task.assigneeId)
    const overdue = isOverdue(task.dueDate)

    function handleStatusChange(newStatus: Status) {
        updateTask(task.id, { status: newStatus })
        setShowStatusDropdown(false)
    }

    return (
        <div
            className={`grid grid-cols-6 gap-4 px-6 py-3 border-b items-center text-sm
        ${overdue ? 'bg-red-50' : 'hover:bg-gray-50'}
      `}
            style={{ height: '64px' }}
        >
            {/* Task Title */}
            <div className="font-medium text-gray-900 truncate">{task.title}</div>

            {/* Assignee */}
            <div className="flex items-center">
                <UserAvatar user={assignee} size="sm" />
            </div>

            {/* Priority */}
            <div className={`px-2 py-1 rounded text-xs font-semibold w-fit ${priorityColors[task.priority]}`}>
                {task.priority}
            </div>

            {/* Status Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs font-medium hover:bg-gray-300 transition"
                >
                    {task.status}
                </button>

                {showStatusDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-30">
                        {statusOptions.map(status => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`block w-full text-left px-3 py-2 text-sm ${task.status === status ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Due Date */}
            <div className={overdue ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                {formatDueDate(task.dueDate)}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => console.log('Edit:', task.id)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                    Edit
                </button>
            </div>
        </div>
    )
}