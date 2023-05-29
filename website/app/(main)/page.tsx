import { type NextPage } from 'next'

import { Button } from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

const Index: NextPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center mt-32">
            <h1 className="max-w-[75rem] font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                A new approach to volunteering with personal growth
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground mt-4 sm:text-xl sm:leading-8">
                Get not only the opportunity to make a charitable contribution, but also a chance to
                acquire new skills or services with the help of time-coins
            </p>
            <Button href="/login" variant="default" size="lg" className="mt-6">
                Get Started
            </Button>
        </div>
    )
}

export default Index
