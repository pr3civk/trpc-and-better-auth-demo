import { authClient } from '@/lib/auth-client'
import { SignInForm } from './components/sign-in-form'
import { redirect } from 'next/navigation'
import { APP_ROUTES } from '@/utils/routes'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function SignUpPage() {
   const session = await auth.api.getSession({
      headers: await headers(),
   })
   if (session) {
      redirect(APP_ROUTES.HOME)
   }

   return (
      <div className="flex flex-col items-center justify-center size-full h-svh p-4">
         <SignInForm />
      </div>
   )
}
