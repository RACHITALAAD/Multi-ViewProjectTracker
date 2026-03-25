import { useEffect, useRef } from 'react'
import { useTaskStore } from './store/useTaskStore'
import { filtersToQuery, queryToFilters } from './utils/queryParamHelpers'
import { useCollaborationSimulation } from './hooks/useCollaborationSimulation'
import FiltersBar from './components/Filters/FiltersBar'
import BoardView from './components/BoardView/BoardView'
import ListView from './components/ListView/ListView'
import TimelineView from './components/TimelineView/TimelineView'
import TopCollaborators from './components/Avatar/TopCollaborators'

// Selector functions memoized OUTSIDE component to prevent recreation
const selectCurrentView = (state: any) => state.currentView
const selectSetCurrentView = (state: any) => state.setCurrentView
const selectFilters = (state: any) => state.filters
const selectSetFilters = (state: any) => state.setFilters

export default function App() {
  const currentView = useTaskStore(selectCurrentView)
  const setCurrentView = useTaskStore(selectSetCurrentView)
  const filters = useTaskStore(selectFilters)
  const setFilters = useTaskStore(selectSetFilters)

  const hasInitialized = useRef(false)

  // Only run once on mount
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const qs = window.location.search.replace(/^\?/, '')
    if (qs) {
      const restoredFilters = queryToFilters(qs)
      setFilters(restoredFilters)
    }
  }, [])

  // Sync filters to URL
  useEffect(() => {
    const query = filtersToQuery(filters)
    const newUrl = query ? `?${query}` : window.location.pathname
    window.history.replaceState(null, '', newUrl)
  }, [filters])

  // Start collaboration
  useCollaborationSimulation()

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Project Tracker</h1>

          <div className="flex gap-2">
            {[
              { id: 'kanban' as const, label: 'Kanban' },
              { id: 'list' as const, label: 'List' },
              { id: 'timeline' as const, label: 'Timeline' },
            ].map(view => (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`px-4 py-2 rounded font-medium transition ${currentView === view.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-4">
          <TopCollaborators />
        </div>
      </header>

      <FiltersBar />

      <main className="flex-1 overflow-hidden flex flex-col">
        {currentView === 'kanban' && <BoardView />}
        {currentView === 'list' && <ListView />}
        {currentView === 'timeline' && <TimelineView />}
      </main>
    </div>
  )
}