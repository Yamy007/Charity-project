import { type Transaction } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma'
import { checkNullFields } from '@/utils/checkNullFields'

// POST

export type PostReqBody = Transaction
export type PostResData = ApiResponse<Transaction>

export const POST: ApiHandler<PostResData> = async req => {
    try {
        const { id, name, amount, date, fromId, toId } = (await req.json()) as PostReqBody

        const nullCkeck = checkNullFields({ id, name, amount, date, fromId, toId })
        if (nullCkeck != null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: `Field ${nullCkeck} is required`,
            } satisfies PostResData)
        }

        // check if fromId and toId are valid
        const fromAccount = await prisma.volunteer.findUnique({
            where: {
                id: fromId,
            },
        })
        const toAccount = await prisma.volunteer.findUnique({
            where: {
                id: toId,
            },
        })
        if (fromAccount == null || toAccount == null) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: 'Invalid fromId or toId',
            } satisfies PostResData)
        }

        // check if fromId has enough balance
        if (fromAccount.balance < amount) {
            return NextResponse.json({
                error: true,
                status: 400,
                message: 'Insufficient balance',
            } satisfies PostResData)
        }

        // create transaction
        const transaction = await prisma.transaction.create({
            data: {
                id,
                name,
                amount,
                date,
                fromId,
                toId,
            },
        })

        // perform transaction
        await prisma.volunteer.update({
            where: {
                id: fromId,
            },
            data: {
                balance: {
                    decrement: amount,
                },
            },
        })
        await prisma.volunteer.update({
            where: {
                id: toId,
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
            message: 'Transaction created successfully',
            data: transaction,
        } satisfies PostResData)
    } catch (error) {
        return NextResponse.json({
            error: true,
            status: 500,
            message: 'Error occured while creating transaction',
        } satisfies PostResData)
    }
}
