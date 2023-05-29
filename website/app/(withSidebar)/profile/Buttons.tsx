'use client'

import { Button } from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

interface ButtonsProps {
    volunteerId: string
    serviceId: string
    children?: React.ReactNode
}

export const Buttons: React.FC<ButtonsProps> = ({ volunteerId, serviceId }) => {
    const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
    }

    const handleDecline = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
    }

    return (
        <div className="mt-3 flex gap-3">
            <Button onClick={handleApprove}>Approve</Button>
            <Button onCanPlay={handleDecline}>Decline</Button>
        </div>
    )
}
