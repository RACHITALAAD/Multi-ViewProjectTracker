// import React from 'react'
import { User } from '../../types'

interface Props {
    user: User | undefined
    size?: 'sm' | 'md' | 'lg'
    title?: string
}

export default function UserAvatar({ user, size = 'md', title }: Props) {
    const sizeClasses = {
        sm: 'w-5 h-5 text-xs',
        md: 'w-7 h-7 text-sm',
        lg: 'w-10 h-10 text-base',
    }

    if (!user) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center font-bold`}>
                ?
            </div>
        )
    }

    return (
        <div
            className={`${sizeClasses[size]} rounded-full ${user.color} flex items-center justify-center font-bold text-white`}
            title={title || user.name}
        >
            {user.initials}
        </div>
    )
}