import { type Service } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma'
import { checkNullFields } from '@/utils/checkNullFields'

// POST

export type PostReqBody = Omit<Service, 'id'>
export type PostResData = ApiResponse<Service>

export const POST: ApiHandler<PostResData> = async req => {
    try {
        const { name, description, type, price, volunteerId } = (await req.json()) as PostReqBody

        const nullCkeck = checkNullFields({ name, description, type, price, volunteerId })
        if (nullCkeck != null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: `Field ${nullCkeck} is required`,
            } satisfies PostResData)
        }

        // check if voolunteerId is valid
        if (volunteerId == null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: 'Field volunteerId is required',
            } satisfies PostResData)
        }
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

        // create service
        const service = await prisma.service.create({
            data: {
                name,
                description,
                type,
                price,
                volunteer: {
                    connect: {
                        id: volunteerId,
                    },
                },
            },
        })

        return NextResponse.json({
            error: false,
            status: 200,
            message: 'Service created successfully',
            data: service,
        } satisfies PostResData)
    } catch (error) {
        return NextResponse.json({
            error: true,
            status: 500,
            message: 'Error occured while creating transaction',
        } satisfies PostResData)
    }
}
