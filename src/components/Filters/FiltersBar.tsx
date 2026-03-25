import { useCallback } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { usesAnyFilters } from '../../utils/queryParamHelpers'
import { USERS } from '../../utils/dataGenerator'

const selectFilters = (state: any) => state.filters
const selectSetFilters = (state: any) => state.setFilters
const selectResetFilters = (state: any) => state.resetFilters

export default function FiltersBar() {
    const filters = useTaskStore(selectFilters)
    const setFilters = useTaskStore(selectSetFilters)
    const resetFilters = useTaskStore(selectResetFilters)

    const toggleStatusFilter = useCallback((status: string) => {
        setFilters({
            status: filters.status.includes(status as any)
                ? filters.status.filter(s => s !== status)
                : [...filters.status, status as any]
        })
    }, [filters.status, setFilters])

    const togglePriorityFilter = useCallback((priority: string) => {
        setFilters({
            priority: filters.priority.includes(priority as any)
                ? filters.priority.filter(p => p !== priority)
                : [...filters.priority, priority as any]
        })
    }, [filters.priority, setFilters])

    const toggleAssigneeFilter = useCallback((assigneeId: string) => {
        setFilters({
            assignee: filters.assignee.includes(assigneeId)
                ? filters.assignee.filter(a => a !== assigneeId)
                : [...filters.assignee, assigneeId]
        })
    }, [filters.assignee, setFilters])

    const handleDueDateChange = useCallback((type: 'dueFrom' | 'dueTo', value: string) => {
        setFilters({ [type]: value || undefined })
    }, [setFilters])

    return (
        <div className="bg-white border-b sticky top-0 z-10">
            <div className="px-6 py-4 space-y-3">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-gray-700 w-16">Status:</span>
                    <div className="flex flex-wrap gap-1">
                        {['To Do', 'In Progress', 'In Review', 'Done'].map(status => (
                            <button
                                key={status}
                                onClick={() => toggleStatusFilter(status)}
                                className={`px-3 py-1 rounded text-sm font-medium transition ${filters.status.includes(status as any)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-gray-700 w-16">Priority:</span>
                    <div className="flex flex-wrap gap-1">
                        {['Critical', 'High', 'Medium', 'Low'].map(priority => (
                            <button
                                key={priority}
                                onClick={() => togglePriorityFilter(priority)}
                                className={`px-3 py-1 rounded text-sm font-medium transition ${filters.priority.includes(priority as any)
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {priority}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-gray-700 w-16">Assignee:</span>
                    <div className="flex flex-wrap gap-1">
                        {USERS.map(user => (
                            <button
                                key={user.id}
                                onClick={() => toggleAssigneeFilter(user.id)}
                                className={`px-3 py-1 rounded text-sm font-medium transition ${filters.assignee.includes(user.id)
                                    ? `${user.color} text-white`
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {user.initials}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-gray-700 w-16">Due Date:</span>
                    <input
                        type="date"
                        value={filters.dueFrom || ''}
                        onChange={(e) => handleDueDateChange('dueFrom', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="From"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        type="date"
                        value={filters.dueTo || ''}
                        onChange={(e) => handleDueDateChange('dueTo', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="To"
                    />

                    {usesAnyFilters(filters) && (
                        <button
                            onClick={resetFilters}
                            className="ml-auto px-4 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded text-sm font-medium transition"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}