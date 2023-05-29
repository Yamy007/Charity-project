import { type Volunteer } from '@prisma/client'
import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Buttons } from '@/app/(withSidebar)/profile/Buttons'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CardComponent } from '@/components/CardComponent'
import { PageHeading } from '@/components/PageHeading'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

const fetchUser = async (email: Volunteer['email']) => {
    try {
        const user = await prisma.volunteer.findUnique({
            where: {
                email,
            },
        })
        if (user == null) {
            return {
                user: null,
                services: null,
            }
        }
        const services = await prisma.service.findMany({
            where: {
                volunteerId: user.id,
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
const Profile: NextPage<ProfileProps> = async () => {
    const session = await getServerSession(authOptions)

    if (session == null || session.user?.email == null) {
        redirect('/login')
    }

    const { user, services } = await fetchUser(session.user.email)

    if (user == null || services == null) {
        redirect('/404')
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <PageHeading heading={user.name}>
                {user.email}
                <br />
                {user.description}
                {user.balance} UAH
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
                    >
                        <Buttons volunteerId={user.id} serviceId={service.id} />
                    </CardComponent>
                </Link>
            ))}
        </div>
    )
}

export default Profile
