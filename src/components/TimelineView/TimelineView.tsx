import React, { useMemo } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { applyFilters } from '../../utils/filterSort'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, parseISO, isToday as isTodayFn, differenceInDays } from 'date-fns'
import TimelineRow from './TimelineRow'
import EmptyState from '../EmptyState/EmptyState'

export default function TimelineView() {
    const tasks = useTaskStore(s => s.tasks)
    const filters = useTaskStore(s => s.filters)

    const filteredTasks = useMemo(
        () => applyFilters(tasks, filters),
        [tasks, filters]
    )

    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
    const todayIndex = daysInMonth.findIndex(d => isTodayFn(d))

    if (filteredTasks.length === 0) {
        return <EmptyState type="list" />
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-white">
            {/* Timeline Header */}
            <div className="border-b sticky top-0 z-10">
                <TimelineHeader daysInMonth={daysInMonth} />
            </div>

            {/* Timeline Container */}
            <div className="flex-1 overflow-x-auto overflow-y-auto">
                <div className="relative">
                    {/* Today's Marker */}
                    {todayIndex >= 0 && (
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-blue-500 z-5"
                            style={{
                                left: `calc(250px + ${todayIndex * 60}px + 30px)`,
                            }}
                        />
                    )}

                    {/* Timeline Rows */}
                    <div>
                        {filteredTasks.map(task => (
                            <TimelineRow
                                key={task.id}
                                task={task}
                                daysInMonth={daysInMonth}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineHeader({ daysInMonth }: { daysInMonth: Date[] }) {
    return (
        <div className="flex bg-gray-50">
            <div className="w-64 px-4 py-2 font-semibold text-gray-700 text-sm flex-shrink-0 border-r">
                Task Name
            </div>
            <div className="flex">
                {daysInMonth.map(date => (
                    <div
                        key={date.toISOString()}
                        className="w-16 px-2 py-2 text-center text-xs font-medium text-gray-600 border-r flex-shrink-0"
                    >
                        <div>{format(date, 'd')}</div>
                        <div className="text-gray-400">{format(date, 'EEE').substring(0, 1)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}