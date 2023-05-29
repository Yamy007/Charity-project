import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/prisma'

import { DonateClient } from './Donate.client'

export const dynamic = 'force-dynamic'

const getUserId = async (email: string) => {
    return await prisma.volunteer.findUnique({
        where: {
            email,
        },
    })
}

// @ts-expect-error
const DonatePage: NextPage = async () => {
    const session = await getServerSession(authOptions)

    if (session == null || session.user?.email == null) {
        return redirect('/login')
    }

    const volunteer = await getUserId(session.user.email)

    if (volunteer == null) {
        return redirect('/404')
    }

    return <DonateClient volunteerId={volunteer.id} />
}

export default DonatePage
