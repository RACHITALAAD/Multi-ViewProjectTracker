import { Task, Priority, Status, User } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { addDays, subDays, formatISO } from 'date-fns'

const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done']

export const USERS: User[] = [
    { id: 'u1', name: 'Alice Brown', color: 'bg-orange-500', initials: 'AB' },
    { id: 'u2', name: 'Bob Smith', color: 'bg-purple-500', initials: 'BS' },
    { id: 'u3', name: 'Chris Yang', color: 'bg-blue-500', initials: 'CY' },
    { id: 'u4', name: 'Dina Patel', color: 'bg-emerald-500', initials: 'DP' },
    { id: 'u5', name: 'Evan Lee', color: 'bg-red-500', initials: 'EL' },
    { id: 'u6', name: 'Farah Khan', color: 'bg-pink-500', initials: 'FK' }
]

function randomTitle(): string {
    const verbs = ['Refactor', 'Fix', 'Test', 'Design', 'Update', 'Document', 'Optimize', 'Implement']
    const nouns = ['API', 'component', 'UI', 'login flow', 'footer', 'performance', 'modal', 'hook', 'utility', 'context']
    const verb = verbs[Math.floor(Math.random() * verbs.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${verb} ${noun}`
}

export function generateTasks(count: number = 500): Task[] {
    const tasks: Task[] = []
    const now = new Date()

    for (let i = 0; i < count; i++) {
        const status: Status = statuses[Math.floor(Math.random() * statuses.length)]
        const priority: Priority = priorities[Math.floor(Math.random() * priorities.length)]
        const user = USERS[Math.floor(Math.random() * USERS.length)]


        const daysOffset = Math.floor(Math.random() * 30) - 15
        const hasStartDate = Math.random() > 0.2

        let startDate: string | undefined
        if (hasStartDate) {
            startDate = formatISO(addDays(now, daysOffset))
        }

        let dueDate = formatISO(addDays(now, daysOffset + 3 + Math.floor(Math.random() * 14)))

        tasks.push({
            id: uuidv4(),
            title: `${randomTitle()} #${i + 1}`,
            assigneeId: user.id,
            priority,
            status,
            startDate,
            dueDate,
            createdAt: formatISO(subDays(now, Math.floor(Math.random() * 30))),
            updatedAt: formatISO(now)
        })
    }

    return tasks
}