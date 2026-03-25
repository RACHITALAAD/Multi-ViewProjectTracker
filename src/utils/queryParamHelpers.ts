import { Status, Priority } from '../types'

export interface Filters {
    status: Status[]
    priority: Priority[]
    assignee: string[]
    dueFrom?: string
    dueTo?: string
}

export function filtersToQuery(filters: Filters): string {
    const params = new URLSearchParams()

    filters.status.forEach(s => params.append('status', s))
    filters.priority.forEach(p => params.append('priority', p))
    filters.assignee.forEach(a => params.append('assignee', a))

    if (filters.dueFrom) params.append('dueFrom', filters.dueFrom)
    if (filters.dueTo) params.append('dueTo', filters.dueTo)

    return params.toString()
}

export function queryToFilters(qs: string): Filters {
    const params = new URLSearchParams(qs)

    return {
        status: (params.getAll('status') as Status[]) || [],
        priority: (params.getAll('priority') as Priority[]) || [],
        assignee: params.getAll('assignee') || [],
        dueFrom: params.get('dueFrom') || undefined,
        dueTo: params.get('dueTo') || undefined,
    }
}

export function usesAnyFilters(filters: Filters): boolean {
    return (
        filters.status.length > 0 ||
        filters.priority.length > 0 ||
        filters.assignee.length > 0 ||
        !!filters.dueFrom ||
        !!filters.dueTo
    )
}