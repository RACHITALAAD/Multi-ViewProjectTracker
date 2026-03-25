import React, { useMemo } from 'react'
import { Task } from '../../types'
import { parseISO, isToday as isTodayFn, differenceInDays, format } from 'date-fns'

interface Props {
    task: Task
    daysInMonth: Date[]
}

const priorityColors = {
    Critical: 'bg-red-700',
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
}

export default function TimelineRow({ task, daysInMonth }: Props) {
    const { barStart, barWidth } = useMemo(() => {
        if (!task.dueDate) return { barStart: -1, barWidth: 0 }

        const dueDate = parseISO(task.dueDate)
        const startDate = task.startDate ? parseISO(task.startDate) : dueDate

        let start = daysInMonth.findIndex(d =>
            d.toDateString() === startDate.toDateString()
        )
        let end = daysInMonth.findIndex(d =>
            d.toDateString() === dueDate.toDateString()
        )

        if (start === -1) start = 0
        if (end === -1) end = daysInMonth.length - 1

        const width = Math.max(1, end - start + 1)

        return { barStart: start, barWidth: width }
    }, [task, daysInMonth])

    if (barStart === -1) {
        return null
    }

    return (
        <div className="flex border-b hover:bg-gray-50 transition">
            {/* Task Name Column */}
            <div className="w-64 px-4 py-3 font-medium text-sm text-gray-900 flex-shrink-0 border-r truncate">
                {task.title}
            </div>

            {/* Timeline Bar */}
            <div className="flex flex-1 relative min-h-[50px] items-center">
                <div
                    className={`${priorityColors[task.priority]} rounded h-6 flex items-center justify-center text-white text-xs font-semibold transition hover:shadow-lg`}
                    style={{
                        marginLeft: `${barStart * 60 + 12}px`,
                        width: `${barWidth * 60 - 24}px`,
                        minWidth: '30px',
                    }}
                    title={task.title}
                >
                    {barWidth <= 2 ? '•' : task.priority[0]}
                </div>
            </div>
        </div>
    )
}