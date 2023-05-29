import { Logo } from '@/components/Logo'
import { cn } from '@/utils/cn'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer
            className={cn(
                className,
                'container flex flex-col items-center justify-start gap-4 py-10 md:h-24 md:flex-row md:py-0 border-t',
            )}
        >
            <Logo />
            <p className="text-center text-sm leading-loose md:text-left">
                Built by{' '}
                <a
                    href="https://github.com/Oleshkooo/best-hackathon"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    503 Team
                </a>
                . The source code is available on{' '}
                <a
                    href="https://github.com/Oleshkooo/best-hackathon"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    GitHub
                </a>
                .
            </p>
        </footer>
    )
}
