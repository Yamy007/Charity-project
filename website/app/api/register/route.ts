import { type Volunteer } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma'
import { checkNullFields } from '@/utils/checkNullFields'

export type PostReqBody = Omit<Volunteer, 'id' | 'balance'>
export type PostResData = ApiResponse<Volunteer>

export const POST: ApiHandler<PostResData> = async req => {
    const { email, password, name, description } = (await req.json()) as PostReqBody

    const nullCheck = checkNullFields({ email, password, name, description })
    if (nullCheck != null) {
        return NextResponse.json({
            error: true,
            status: 400,
            message: `Field ${nullCheck} is required`,
        } satisfies PostResData)
    }

    const user = await prisma.volunteer.findUnique({
        where: {
            email,
        },
    })

    if (user != null) {
        return NextResponse.json({
            status: 400,
            error: true,
            message: 'User already exists with this email',
        } satisfies PostResData)
    }

    const newUser = await prisma.volunteer.create({
        data: {
            email,
            password,
            name,
            description,
            balance: 0,
        },
    })

    return NextResponse.json({
        status: 200,
        error: false,
        message: 'User created successfully',
        data: newUser,
    } satisfies PostResData)
}
