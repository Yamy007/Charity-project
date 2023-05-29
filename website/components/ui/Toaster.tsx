'use client'

import { memo } from 'react'

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui/Toast'
import { useToast } from '@/hooks/use-toast'

//

export const Toaster: React.FC = memo(() => {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, action, ...props }) => {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title !== undefined && <ToastTitle>{title}</ToastTitle>}
                            {description !== undefined && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
})
Toaster.displayName = 'Toaster'
