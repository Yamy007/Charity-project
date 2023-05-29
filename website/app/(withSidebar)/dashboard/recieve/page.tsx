import { ServiceType } from '@prisma/client'
import { type NextPage } from 'next'
import Link from 'next/link'

import { CardComponent } from '@/components/CardComponent'
import { PageHeading } from '@/components/PageHeading'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

const fetchRecieves = async () => {
    return await prisma.service.findMany({
        where: {
            type: ServiceType.RECIEVER,
        },
    })
}

// @ts-expect-error Async Server Component
const Recieve: NextPage = async () => {
    const recieves = await fetchRecieves()

    return (
        <div className="flex flex-col gap-[40px]">
            <PageHeading heading="Recieving services">
                You can work for users here to earn coins!
            </PageHeading>
            <main className="flex flex-col gap-4">
                {recieves.map(service => (
                    <Link key={service.id} href={`/dashboard/${service.id}`}>
                        <CardComponent title={service.name} description={service.description} />
                    </Link>
                ))}
            </main>
        </div>
    )
}

export default Recieve
