import { type Volunteer } from '@prisma/client'
import { type NextPage } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CardComponent } from '@/components/CardComponent'
import { PageHeading } from '@/components/PageHeading'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

interface ProfileProps {
    params: {
        id: string
    }
}

const fetchUser = async (id: Volunteer['id']) => {
    try {
        const user = await prisma.volunteer.findUnique({
            where: {
                id,
            },
        })
        const services = await prisma.service.findMany({
            where: {
                volunteerId: id,
            },
        })
        return {
            user,
            services,
        }
    } catch (error) {
        console.error(error)
        redirect('/404')
    }
}

// @ts-expect-error Async Server Component
const Profile: NextPage<ProfileProps> = async ({ params }) => {
    const { user, services } = await fetchUser(params.id)

    if (user == null) {
        redirect('/404')
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <PageHeading heading={user.name}>
                {user.email}
                <br />
                {user.description}
            </PageHeading>

            {services?.map(service => (
                <Link key={service.id} href={`/dashboard/${service.id}`}>
                    <CardComponent
                        title={service.name}
                        description={
                            service.description?.length === 0
                                ? 'No description'
                                : service.description
                        }
                    />
                </Link>
            ))}
        </div>
    )
}

export default Profile
