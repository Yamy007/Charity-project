import { Card, CardDescription, CardTitle } from '@/components/ui/Card'

interface CardComponentProps {
    title?: string
    description?: string
    children?: React.ReactNode
}

export const CardComponent: React.FC<CardComponentProps> = ({ title, description, children }) => {
    return (
        <Card className="py-5 px-7 hover:bg-slate-50 transition-all duration-300">
            {title != null ? <CardTitle>{title}</CardTitle> : null}
            {description != null ? (
                <CardDescription className="mt-2">{description}</CardDescription>
            ) : null}
            {/* {children != null ? <CardContent className="mt-5">{children}</CardContent> : null} */}
            {children}
        </Card>
    )
}
