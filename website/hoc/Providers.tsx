'use client'

import { type SessionProviderProps } from 'next-auth/react'

import { AuthProvider } from '@/hoc/AuthProvider'

interface ProvidersProps {
    session: SessionProviderProps['session']
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ session, children }) => {
    return <AuthProvider session={session}>{children}</AuthProvider>
}
