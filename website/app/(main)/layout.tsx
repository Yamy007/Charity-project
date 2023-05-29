import { navItems } from '@/app/layout'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header>
                {navItems.map(link => (
                    <Button key={link.title} href={link.href} variant="linkSecondary">
                        {link.title}
                    </Button>
                ))}
            </Header>
            <div className="py-3" />
            <div className="container">{children}</div>
        </>
    )
}

export default Layout
