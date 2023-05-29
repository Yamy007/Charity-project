import { type Service } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CardComponent } from '@/components/CardComponent'
import { PageHeading } from '@/components/PageHeading'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

interface ServiceExactProps {
    params: {
        id: string
    }
}

const fetchService = async (id: Service['id']) => {
    return await prisma.service.findUnique({
        where: {
            id,
        },
        include: {
            volunteer: true,
        },
    })
}

// @ts-expect-error Async Server Component
const ServiceExact: NextPage<ServiceExactProps> = async ({ params }) => {
    const service = await fetchService(params.id)

    if (service == null || service.volunteerId == null) {
        redirect('/404')
    }

    const title =
        (service.volunteer?.name ?? 'Unknown') +
        (service.type === 'SUPPLIER' ? ' - Supplier' : ' - Reciever')

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex justify-between items-center">
                <PageHeading heading={service.name}>{service.description}</PageHeading>
                <div className="flex flex-col items-center sm:items-end w-[40%] gap-3">
                    <Button>{service.type === 'SUPPLIER' ? 'Buy it' : 'Provide help'}</Button>
                </div>
            </div>
            <Link href={`/profile/${service.volunteerId}`}>
                <CardComponent
                    title={title}
                    description={
                        service.description?.length === 0 ? 'No description' : service.description
                    }
                />
            </Link>
        </div>
    )
}

export default ServiceExact
