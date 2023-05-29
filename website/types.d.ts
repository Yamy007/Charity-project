declare module '*?inline' {
    const src: string
    export default src
}

declare type ApiHandler<T> = (req: NextRequest) => NextResponse<T>

declare interface ApiResponse<T> {
    error: boolean
    status: number
    message: string
    data?: T
}
