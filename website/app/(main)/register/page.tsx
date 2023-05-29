'use client'

import { ChevronLeft } from 'lucide-react'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { type PostReqBody, type PostResData } from '@/app/api/register/route'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useInput } from '@/hooks/use-input'
import { toast } from '@/hooks/use-toast'
import { Fetch } from '@/utils/Fetch'

export const dynamic = 'force-dynamic'

const Register: NextPage = () => {
    const { value: name, reset: resetName, bind: bindName } = useInput('')
    const { value: email, reset: resetEmail, bind: bindEmail } = useInput('')
    const { value: password, reset: resetPassword, bind: bindPassword } = useInput('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name.length === 0 || email.length === 0 || password.length === 0) {
            toast({
                title: 'Register error',
                description: 'Please fill out email, password and confirmation',
                variant: 'destructive',
            })
            return
        }

        if (!email.includes('@')) {
            toast({
                title: 'Register error',
                description: 'Please enter a valid email',
                variant: 'destructive',
            })
            return
        }

        const res = await Fetch<PostResData>('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                name,
                description: '',
            } satisfies PostReqBody),
        })

        if (res.error) {
            toast({
                title: 'Register error',
                description: res.message,
                variant: 'destructive',
            })
            return
        }

        toast({
            title: 'Register error',
            description: 'Signed up successfully!',
            variant: 'default',
        })

        resetName()
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
                    <h1 className="text-2xl font-semibold tracking-tight">Hi, stranger!</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to sign up
                    </p>
                </div>
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input type="text" name="name" placeholder="Name" {...bindName} />
                    <Input type="text" name="email" placeholder="Email" {...bindEmail} />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...bindPassword}
                    />
                    <Button type="submit">Sign up</Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/login"
                        className="hover:text-brand underline underline-offset-4 hover:text-gray-400 transition"
                    >
                        Already have an account? Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
