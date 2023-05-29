'use client'

import { ServiceType } from '@prisma/client'
import { useState } from 'react'

import { type PostReqBody, type PostResData } from '@/app/api/service/route'
import { PageHeading } from '@/components/PageHeading'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useInput } from '@/hooks/use-input'
import { toast } from '@/hooks/use-toast'
import { Fetch } from '@/utils/Fetch'

export const dynamic = 'force-dynamic'

interface NewClientProps {
    id: string
    children?: React.ReactNode
}

export const NewClient: React.FC<NewClientProps> = ({ id }) => {
    const { value: name, reset: resetName, bind: bindName } = useInput('')
    const { value: desc, reset: resetDesc, bind: bindDesc } = useInput('')
    const { value: price, reset: resetPrice, bind: bindPrice } = useInput('')
    const [type, setType] = useState('reciever')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.currentTarget.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await Fetch<PostResData>('/api/service', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description: desc,
                type: type === 'reciever' ? ServiceType.RECIEVER : ServiceType.SUPPLIER,
                price: Number(price),
                volunteerId: id,
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

        resetName()
        resetDesc()
        resetPrice()
        setType('')

        toast({
            title: 'Success',
            description: 'Service created successfully',
            variant: 'default',
        })
    }

    return (
        <div className="w-full flex flex-col items-center gap-6 px-3 sm:py-9">
            <PageHeading heading="Creating new service" />
            <form className="w-[80%] flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Name of your service" {...bindName} />
                <Input
                    type="text"
                    name="desc"
                    placeholder="Short description of your service"
                    {...bindDesc}
                />
                <Input type="number" name="price" placeholder="Service price" {...bindPrice} />
                <div className="flex w-full">
                    <div className="flex flex-1 flex-col items-center gap-2">
                        <Input
                            type="radio"
                            id="ch1"
                            name="type"
                            value="reciever"
                            onChange={onChange}
                        />
                        <label htmlFor="ch1">You recieve service</label>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-2">
                        <Input
                            type="radio"
                            id="ch2"
                            name="type"
                            value="supplier"
                            onChange={onChange}
                        />
                        <label htmlFor="ch2">You supply service</label>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button type="submit">Create new service</Button>
                </div>
            </form>
        </div>
    )
}
