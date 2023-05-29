'use client'

import { ChevronLeft } from 'lucide-react'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { type PostReqBody, type PostResData } from '@/app/api/login/route'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useInput } from '@/hooks/use-input'
import { toast } from '@/hooks/use-toast'
import { Fetch } from '@/utils/Fetch'

export const dynamic = 'force-dynamic'

const Login: NextPage = () => {
    const { value: email, reset: resetEmail, bind: bindEmail } = useInput('')
    const { value: password, reset: resetPassword, bind: bindPassword } = useInput('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email.length === 0 || password.length === 0) {
            toast({
                title: 'Login error',
                description: 'Please fill out email and password',
                variant: 'destructive',
            })
            return
        }

        const res = await Fetch<PostResData>('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            } satisfies PostReqBody),
        })

        if (res.error) {
            toast({
                title: 'Login error',
                description: res.message,
                variant: 'destructive',
            })
            return
        }

        toast({
            title: 'Login successfull',
            description: 'Signed in successfully!',
            variant: 'default',
        })

        resetEmail()
        resetPassword()

        void signIn('credentials', {
            username: email,
            password,
            redirect: true,
            callbackUrl: '/dashboard/recieve',
        })
    }

    return (
        <div className="flex h-screen w-full flex-col gap-[100px]">
            <Button href="/" variant="ghost" className="w-28">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back
            </Button>
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to sign in
                    </p>
                </div>
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input type="text" name="email" placeholder="name@example.com" {...bindEmail} />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        {...bindPassword}
                    />
                    <Button type="submit">Sign in</Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/register"
                        className="hover:text-brand underline underline-offset-4 hover:text-gray-400 transition"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
