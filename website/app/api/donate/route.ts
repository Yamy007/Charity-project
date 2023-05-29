import { type Volunteer } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma'
import { checkNullFields } from '@/utils/checkNullFields'

// POST

export interface PostReqBody {
    volunteerId: string
    amount: number
}
export type PostResData = ApiResponse<Volunteer>

export const POST: ApiHandler<PostResData> = async req => {
    try {
        const { volunteerId, amount } = (await req.json()) as PostReqBody

        const nullCkeck = checkNullFields({ volunteerId, amount })
        if (nullCkeck != null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: `Field ${nullCkeck} is required`,
            } satisfies PostResData)
        }

        // check if voolunteerId is valid
        const validateVolunteerId = await prisma.volunteer.findUnique({
            where: {
                id: volunteerId,
            },
        })
        if (validateVolunteerId == null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: 'Invalid volunteerId',
            } satisfies PostResData)
        }

        // add amount to volunteer's balance
        const volunteer = await prisma.volunteer.update({
            where: {
                id: volunteerId,
            },
            data: {
                balance: {
                    increment: amount,
                },
            },
        })

        return NextResponse.json({
            error: false,
            status: 200,
            message: 'Service created successfully',
            data: volunteer,
        } satisfies PostResData)
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: true,
            status: 500,
            message: 'Error occured while creating transaction',
        } satisfies PostResData)
    }
}
