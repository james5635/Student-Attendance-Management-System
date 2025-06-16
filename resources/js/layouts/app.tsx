import { User } from '@/types'
import { PropsWithChildren } from 'react'

interface Props {
    user?: User
}

export default function AppLayout({ children }: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    )
}
