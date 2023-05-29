import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { NewClient } from '@/app/(withSidebar)/dashboard/new/NewClient'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

// @ts-expect-error Async Server Component
const NewServicePage: NextPage = async () => {
    const session = await getServerSession()

    if (session == null || session.user?.email == null) {
        return redirect('/login')
    }

    const user = await prisma.volunteer.findUnique({
        where: {
            email: session.user.email,
        },
    })

    if (user == null) {
        return redirect('/login')
    }

    return <NewClient id={user.id} />
}

export default NewServicePage
