import { useEffect } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import { USERS } from '../utils/dataGenerator'

const SIMULATION_USERS = USERS.slice(1, 4)

export function useCollaborationSimulation() {
    const tasks = useTaskStore(s => s.tasks)
    const setCollaborations = useTaskStore(s => s.setCollaborations)

    useEffect(() => {
        if (tasks.length === 0) return

        const interval = setInterval(() => {
            const collaborations = SIMULATION_USERS.map(user => {
                const randomTask = tasks[Math.floor(Math.random() * tasks.length)]
                return {
                    userId: user.id,
                    taskId: randomTask.id,
                    mode: Math.random() > 0.7 ? ('editing' as const) : ('viewing' as const),
                    timestamp: Date.now(),
                }
            })

            setCollaborations(collaborations)
        }, 3000)

        return () => clearInterval(interval)
    }, [tasks.length, setCollaborations])
}