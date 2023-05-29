'use client'

import { type Volunteer } from '@prisma/client'
import { useMemo } from 'react'

import { type PostReqBody, type PostResData } from '@/app/api/donate/route'
import { PageHeading } from '@/components/PageHeading'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useInput } from '@/hooks/use-input'
import { toast } from '@/hooks/use-toast'
import { Fetch } from '@/utils/Fetch'

export const dynamic = 'force-dynamic'

interface DonateClientProps {
    volunteerId: Volunteer['id']
}

export const DonateClient: React.FC<DonateClientProps> = ({ volunteerId }) => {
    const { value: coins, reset: resetCoins, bind: bindCoins } = useInput('')
    const { value: card, reset: resetCard, bind: bindCard } = useInput('')
    const { value: exp, reset: resetExp, bind: bindExp } = useInput('')
    const { value: cvv, reset: resetCvv, bind: bindCvv } = useInput('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (coins.length === 0 || card.length === 0 || exp.length === 0 || cvv.length === 0) {
            toast({
                title: 'Error',
                description: 'Please fill out all fields',
                variant: 'destructive',
            })
            return
        }

        if (card.length < 16) {
            toast({
                title: 'Error',
                description: 'Please provide a valid card number',
                variant: 'destructive',
            })
            return
        }

        if (exp.length < 5 || exp[2] !== '/') {
            toast({
                title: 'Error',
                description: 'Please provide a valid expiration date (Syntax: MM/YY)',
                variant: 'destructive',
            })
            return
        }

        if (cvv.length < 3) {
            toast({
                title: 'Error',
                description: 'Please provide a CVV/CVV2 code',
                variant: 'destructive',
            })
            return
        }

        if (Number(coins) > 1000) {
            toast({
                title: 'Error',
                description: 'You can donate only 1000 coins at once',
                variant: 'destructive',
            })
            return
        }

        const res = await Fetch<PostResData>('/api/donate', {
            method: 'POST',
            body: JSON.stringify({
                volunteerId,
                amount: Number(coins),
            } satisfies PostReqBody),
        })

        if (res.error) {
            toast({
                title: 'Error',
                description: res.message,
                variant: 'destructive',
            })
            return
        }

        toast({
            title: 'Success',
            description: `Successfully donated ${Number(coins) * 50} UAH!`,
            variant: 'default',
        })

        resetCoins()
        resetCard()
        resetExp()
        resetCvv()
    }

    const coinHoursPrice = useMemo(() => {
        if (isNaN(Number(coins))) return 0
        return Number(coins) * 50
    }, [coins])

    return (
        <div className="w-full flex flex-col items-center gap-6 px-3 sm:py-9">
            <PageHeading heading="Donating" />
            <form className="w-[80%]  flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input type="number" name="price" placeholder="Coins amount" {...bindCoins} />
                <Input
                    type="text"
                    maxLength={16}
                    name="hex"
                    placeholder="Card number"
                    {...bindCard}
                />
                <div className="flex gap-3">
                    <Input
                        type="text"
                        maxLength={5}
                        name="expire"
                        placeholder="Expiration date"
                        {...bindExp}
                    />
                    <Input
                        type="text"
                        maxLength={3}
                        name="cvv"
                        placeholder="CVV/CVV2"
                        {...bindCvv}
                    />
                </div>
                <div className="flex justify-center">
                    <Button>Donate {coinHoursPrice} UAH</Button>
                </div>
            </form>
        </div>
    )
}
