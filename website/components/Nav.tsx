'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

export interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
}

interface NavProps {
    items: NavItem[]
}

export const Nav: React.FC<NavProps> = ({ items }) => {
    const path = usePathname()

    if (items?.length === 0) {
        return null
    }

    return (
        <nav className="grid items-start gap-2">
            {items.map(item => (
                <Link key={item.title} href={item.href}>
                    <span
                        className={cn(
                            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                            path === item.href ? 'bg-accent' : 'transparent',
                        )}
                    >
                        <span className="w-4 mr-3 py-1">{item.icon}</span>
                        <span>{item.title}</span>
                    </span>
                </Link>
            ))}
        </nav>
    )
}
