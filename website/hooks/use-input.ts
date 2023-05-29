'use client'

import { useCallback, useState } from 'react'

type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void

type UseInput = (initialValue: string) => {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    onChange: OnChange
    reset: () => void
    bind: {
        value: string
        onChange: OnChange
    }
}

export const useInput: UseInput = initialValue => {
    const [value, setValue] = useState(initialValue)

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    const reset = useCallback(() => {
        setValue(initialValue)
    }, [initialValue])

    return {
        value,
        setValue,
        onChange,
        reset,
        bind: {
            value,
            onChange,
        },
    } as const
}
