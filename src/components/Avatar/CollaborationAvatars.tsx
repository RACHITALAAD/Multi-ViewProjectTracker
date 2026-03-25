import React from 'react'
import { CollaborationPresence } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import UserAvatar from './UserAvatar'

interface Props {
    collaborators: CollaborationPresence[]
    maxDisplay?: number
}

export default function CollaborationAvatars({ collaborators, maxDisplay = 3 }: Props) {
    const users = useTaskStore(s => s.users)

    if (collaborators.length === 0) return null

    const displayed = collaborators.slice(0, maxDisplay)
    const remaining = Math.max(0, collaborators.length - maxDisplay)

    return (
        <div className="flex items-center -space-x-2 ml-2">
            {displayed.map((collab) => {
                const user = users.find(u => u.id === collab.userId)
                return (
                    <div key={collab.userId} className="collab-avatar">
                        <UserAvatar user={user} size="sm" />
                    </div>
                )
            })}
            {remaining > 0 && (
                <div className="w-5 h-5 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center font-bold">
                    +{remaining}
                </div>
            )}
        </div>
    )
}