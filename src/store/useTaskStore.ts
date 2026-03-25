import { create } from 'zustand'
import { Task, Status, CollaborationPresence, ListSortKey } from '../types'
import { generateTasks, USERS } from '../utils/dataGenerator'
import type { Filters } from '../utils/queryParamHelpers'

export type Store = {
  tasks: Task[]
  updateTask: (id: string, patch: Partial<Task>) => void

  currentView: 'kanban' | 'list' | 'timeline'
  setCurrentView: (view: 'kanban' | 'list' | 'timeline') => void
  listSortConfig: { key: ListSortKey; direction: 'asc' | 'desc' }
  setListSort: (key: ListSortKey) => void

  filters: Filters
  setFilters: (filters: Partial<Filters>) => void
  resetFilters: () => void

  draggedTaskId?: string
  setDraggedTaskId: (id?: string) => void
  draggedTaskInitialStatus?: Status
  setDraggedTaskInitialStatus: (status?: Status) => void
  dragOverColumn?: Status
  setDragOverColumn: (status?: Status) => void

  collaborations: CollaborationPresence[]
  setCollaborations: (arr: CollaborationPresence[]) => void
  users: typeof USERS
}

const initialFilters: Filters = {
  status: [],
  priority: [],
  assignee: [],
}

export const useTaskStore = create<Store>((set) => ({
  tasks: generateTasks(500),
  updateTask: (id, patch) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...patch } : t)
  })),

  currentView: 'kanban',
  setCurrentView: (view) => set({ currentView: view }),

  listSortConfig: { key: 'dueDate', direction: 'asc' },
  setListSort: (key) => set((state) => ({
    listSortConfig: {
      key,
      direction: state.listSortConfig.key === key
        ? state.listSortConfig.direction === 'asc' ? 'desc' : 'asc'
        : 'asc'
    }
  })),

  filters: initialFilters,
  setFilters: (f) => set((state) => ({
    filters: { ...state.filters, ...f }
  })),
  resetFilters: () => set(() => ({ filters: initialFilters })),

  draggedTaskId: undefined,
  setDraggedTaskId: (id) => set(() => ({ draggedTaskId: id })),
  draggedTaskInitialStatus: undefined,
  setDraggedTaskInitialStatus: (status) => set(() => ({ draggedTaskInitialStatus: status })),
  dragOverColumn: undefined,
  setDragOverColumn: (status) => set(() => ({ dragOverColumn: status })),

  collaborations: [],
  setCollaborations: (arr) => set(() => ({ collaborations: arr })),

  users: USERS,
}))