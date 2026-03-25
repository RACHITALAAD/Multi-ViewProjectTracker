import React, { useMemo } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import UserAvatar from './UserAvatar'

const selectCollaborations = (state: any) => state.collaborations
const selectUsers = (state: any) => state.users

export default function TopCollaborators() {
    const collaborations = useTaskStore(selectCollaborations)
    const users = useTaskStore(selectUsers)

    const uniqueUsers = useMemo(() => {
        const userIds = new Set(collaborations.map(c => c.userId))
        return Array.from(userIds)
            .map(userId => users.find(u => u.id === userId))
            .filter(Boolean)
    }, [collaborations.length, users])

    if (uniqueUsers.length === 0) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded">
                👤 Nobody is viewing this board
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded">
            <div className="flex -space-x-2">
                {uniqueUsers.map((user) => (
                    <UserAvatar key={user?.id} user={user} size="sm" />
                ))}
            </div>
            <span className="text-sm text-gray-600">
                {uniqueUsers.length} {uniqueUsers.length === 1 ? 'person is' : 'people are'} viewing this board
            </span>
        </div>
    )
}