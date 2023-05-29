type CheckNullFields = (obj: Record<string, any>) => string | null

export const checkNullFields: CheckNullFields = obj => {
    for (const key in obj) {
        if (obj[key] == null) {
            return key
        }
    }
    return null
}
