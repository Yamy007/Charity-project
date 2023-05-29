import { Gem, HelpingHand, User } from 'lucide-react'
import { type Metadata, type NextPage } from 'next'
import { type SessionProviderProps } from 'next-auth/react'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/Footer'
import { type NavItem } from '@/components/Nav'
import { TailwindIndicator } from '@/components/ui/Tailwind-indicator'
import { Toaster } from '@/components/ui/Toaster'
import { Providers } from '@/hoc/Providers'
import '@/styles/editor.css'
import '@/styles/global.css'
import '@/styles/mdx.css'
import '@/styles/toaster.css'

// TODO add metadata
export const metadata: Metadata = {
    title: 'Website',
    description: 'Website',
}

interface RootLayoutProps {
    session: SessionProviderProps['session']
    children: React.ReactNode
}

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const navItems: NavItem[] = [
    {
        title: 'Recieve',
        href: '/dashboard/recieve',
        icon: <HelpingHand size={18} />,
    },
    {
        title: 'Supply',
        href: '/dashboard/supply',
        icon: <Gem size={18} />,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: <User size={18} />,
    },
]

const RootLayout: NextPage<RootLayoutProps> = ({ session, children }) => {
    return (
        <html lang="en">
            <Providers session={session}>
                <body
                    style={inter.style}
                    className="min-h-screen bg-background font-sans antialiased"
                >
                    <div className="flex flex-col min-h-screen justify-between">
                        {children}
                        <div className="mb-auto" />
                        <Footer />
                    </div>
                    <Toaster />
                    <TailwindIndicator />
                </body>
            </Providers>
        </html>
    )
}

export default RootLayout
