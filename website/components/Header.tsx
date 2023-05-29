import Link from 'next/link'

import { Logo } from '@/components/Logo'

import { Button } from './ui/Button'

interface HeaderProps {
    children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container h-16 flex justify-between items-center py-4">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo />
                        <span className="font-bold">SkillSwap</span>
                    </Link>
                    <div className="flex items-center gap-1">{children}</div>
                </div>
                <div className="flex text-center gap-5">
                    <Button variant="outline" href="/dashboard/new">
                        New service
                    </Button>
                    <Button variant="outline" href="/dashboard/donate">
                        Donate
                    </Button>
                </div>
            </div>
        </header>
    )
}
