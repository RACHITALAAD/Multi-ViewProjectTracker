import { Task, ListSortKey, Priority, Status } from '../types'
import { parseISO, isPast, differenceInDays, isToday } from 'date-fns'

export interface Filters {
    status: Status[]
    priority: Priority[]
    assignee: string[]
    dueFrom?: string
    dueTo?: string
}

export function applyFilters(tasks: Task[], filters: Filters): Task[] {
    return tasks.filter(task => {
        if (filters.status.length > 0 && !filters.status.includes(task.status)) {
            return false
        }

        if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
            return false
        }

        if (filters.assignee.length > 0 && !filters.assignee.includes(task.assigneeId)) {
            return false
        }

        if (task.dueDate) {
            const dueDate = parseISO(task.dueDate)

            if (filters.dueFrom) {
                const fromDate = parseISO(filters.dueFrom)
                if (dueDate < fromDate) return false
            }

            if (filters.dueTo) {
                const toDate = parseISO(filters.dueTo)
                toDate.setHours(23, 59, 59, 999)
                if (dueDate > toDate) return false
            }
        }

        return true
    })
}

const priorityOrder: Record<Priority, number> = {
    'Critical': 0,
    'High': 1,
    'Medium': 2,
    'Low': 3,
}

export function sortTasks(
    tasks: Task[],
    key: ListSortKey,
    direction: 'asc' | 'desc'
): Task[] {
    const sorted = [...tasks].sort((a, b) => {
        let compareValue = 0

        if (key === 'title') {
            compareValue = a.title.localeCompare(b.title)
        } else if (key === 'priority') {
            compareValue = priorityOrder[a.priority] - priorityOrder[b.priority]
        } else if (key === 'dueDate') {
            const aDate = a.dueDate ? parseISO(a.dueDate).getTime() : Infinity
            const bDate = b.dueDate ? parseISO(b.dueDate).getTime() : Infinity
            compareValue = aDate - bDate
        }

        return direction === 'asc' ? compareValue : -compareValue
    })

    return sorted
}

export function formatDueDate(dueDate: string | undefined): string {
    if (!dueDate) return 'No date'

    const date = parseISO(dueDate)

    if (isToday(date)) {
        return 'Due Today'
    }

    if (isPast(date)) {
        const daysOverdue = differenceInDays(new Date(), date)
        if (daysOverdue > 7) {
            return `${daysOverdue} days overdue`
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function isDueSoon(dueDate: string | undefined): boolean {
    if (!dueDate) return false
    const date = parseISO(dueDate)
    const today = new Date()
    const daysUntilDue = differenceInDays(date, today)
    return daysUntilDue <= 3 && daysUntilDue >= 0
}

export function isOverdue(dueDate: string | undefined): boolean {
    if (!dueDate) return false
    return isPast(parseISO(dueDate))
}