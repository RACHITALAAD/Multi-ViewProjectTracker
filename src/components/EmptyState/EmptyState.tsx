import React from 'react'
import { useTaskStore } from '../../store/useTaskStore'

interface Props {
    type: 'column' | 'list'
    columnName?: string
}

export default function EmptyState({ type, columnName }: Props) {
    const resetFilters = useTaskStore(s => s.resetFilters)

    if (type === 'column') {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-medium">No tasks in {columnName}</p>
                <p className="text-xs">Drag tasks here to get started</p>
            </div>
        )
    }

    if (type === 'list') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
                </svg>
                <p className="text-lg font-semibold mb-2">No tasks found</p>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                    Clear all filters
                </button>
            </div>
        )
    }

    return null
}