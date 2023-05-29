'use client'

import { SessionProvider, type SessionProviderProps } from 'next-auth/react'

interface AuthProviderProps {
    session: SessionProviderProps['session']
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ session, children }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}
