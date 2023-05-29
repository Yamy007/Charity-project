import { ServiceType } from '@prisma/client'
import { type NextPage } from 'next'
import Link from 'next/link'

import { CardComponent } from '@/components/CardComponent'
import { PageHeading } from '@/components/PageHeading'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

const fetchSupplies = async () => {
    return await prisma.service.findMany({
        where: {
            type: ServiceType.SUPPLIER,
        },
    })
}

// @ts-expect-error Async Server Component
const Supply: NextPage = async () => {
    const supplies = await fetchSupplies()

    return (
        <div className="flex flex-col gap-[40px]">
            <PageHeading heading="Supplying services">
                You can hire users here to do work for you!
            </PageHeading>
            <main className="p-2 flex flex-col gap-4">
                {supplies.map(service => (
                    <Link key={service.id} href={`/dashboard/${service.id}`}>
                        <CardComponent title={service.name} description={service.description} />
                    </Link>
                ))}
            </main>
        </div>
    )
}

export default Supply
