import { type Volunteer } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma'
import { checkNullFields } from '@/utils/checkNullFields'

export interface PostReqBody {
    email: Volunteer['email']
    password: Volunteer['password']
}
export type PostResData = ApiResponse<Volunteer>

export const POST: ApiHandler<PostResData> = async req => {
    const { email, password } = (await req.json()) as PostReqBody

    const nullCkeck = checkNullFields({ email, password })
    if (nullCkeck != null) {
        return NextResponse.json({
            error: true,
            status: 400,
            message: `Field ${nullCkeck} is required`,
        } satisfies PostResData)
    }

    // find user by email
    const user = await prisma.volunteer.findUnique({
        where: {
            email,
        },
    })

    // check if user exists and password is correct
    if (user === null || user.password !== password) {
        return NextResponse.json({
            status: 400,
            error: true,
            message: 'Password or username is incorrect',
        } satisfies PostResData)
    }

    return NextResponse.json({
        status: 200,
        error: false,
        message: 'Successfully logged in',
        data: user,
    } satisfies PostResData)
}
