import React, { useRef, useState, useCallback, useMemo } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { applyFilters, sortTasks } from '../../utils/filterSort'
import { calculateVirtualRange } from '../../utils/virtualScroll'
import EmptyState from '../EmptyState/EmptyState'
import ListRow from './ListRow'

const ROW_HEIGHT = 64 // px (including margin)
const BUFFER_SIZE = 5

export default function ListView() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollTop, setScrollTop] = useState(0)

    const tasks = useTaskStore(s => s.tasks)
    const filters = useTaskStore(s => s.filters)
    const listSortConfig = useTaskStore(s => s.listSortConfig)

    // Apply filters and sort
    const filteredAndSorted = useMemo(() => {
        const filtered = applyFilters(tasks, filters)
        return sortTasks(filtered, listSortConfig.key, listSortConfig.direction)
    }, [tasks, filters, listSortConfig])

    // Calculate visible range
    const containerHeight = containerRef.current?.clientHeight || 600
    const { startIndex, endIndex, offsetY } = calculateVirtualRange(
        scrollTop,
        ROW_HEIGHT,
        containerHeight,
        filteredAndSorted.length,
        BUFFER_SIZE
    )

    const visibleTasks = filteredAndSorted.slice(startIndex, endIndex + 1)
    const totalHeight = filteredAndSorted.length * ROW_HEIGHT

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        setScrollTop((e.target as HTMLDivElement).scrollTop)
    }

    if (filteredAndSorted.length === 0) {
        return <EmptyState type="list" />
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* Table Header */}
            <div className="sticky top-0 z-20 bg-white border-b">
                <ListHeader />
            </div>

            {/* Virtual Scrolling Container */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto virtual-scroller"
            >
                <div style={{ height: totalHeight, position: 'relative' }}>
                    <div style={{ transform: `translateY(${offsetY}px)` }}>
                        {visibleTasks.map((task) => (
                            <ListRow key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ListHeader() {
    const listSortConfig = useTaskStore(s => s.listSortConfig)
    const setListSort = useTaskStore(s => s.setListSort)

    function handleSort(key: 'title' | 'priority' | 'dueDate') {
        setListSort(key)
    }

    const SortIcon = ({ active }: { active: boolean }) => (
        <span className={`ml-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
            {listSortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
    )

    return (
        <div className="grid grid-cols-6 gap-4 px-6 py-3 font-semibold text-gray-700 text-sm bg-gray-50">
            <button
                onClick={() => handleSort('title')}
                className="text-left hover:text-blue-600 transition flex items-center"
            >
                Task Name
                {listSortConfig.key === 'title' && <SortIcon active />}
            </button>
            <div className="text-left">Assignee</div>
            <button
                onClick={() => handleSort('priority')}
                className="text-left hover:text-blue-600 transition flex items-center"
            >
                Priority
                {listSortConfig.key === 'priority' && <SortIcon active />}
            </button>
            <div className="text-left">Status</div>
            <button
                onClick={() => handleSort('dueDate')}
                className="text-left hover:text-blue-600 transition flex items-center"
            >
                Due Date
                {listSortConfig.key === 'dueDate' && <SortIcon active />}
            </button>
            <div className="text-left">Actions</div>
        </div>
    )
}