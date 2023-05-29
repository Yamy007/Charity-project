import { type NextPage } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Page: NextPage = () => {
    return redirect('/dashboard/recieve')
}

export default Page
