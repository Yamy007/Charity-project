import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Cn = (...inputs: ClassValue[]) => string

export const cn: Cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}
