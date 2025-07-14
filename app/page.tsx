'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { APP_ROUTES } from '@/utils/routes'

export default function Home() {
   const session = authClient.useSession()
   return (
      <div>
         <pre>{session.data?.user?.name}</pre>
         <Button
            onClick={() =>
               authClient.signOut({
                  fetchOptions: {
                     onSuccess: () => {
                        redirect(APP_ROUTES.SIGN_IN)
                     },
                  },
               })
            }
         >
            Sign Out
         </Button>
      </div>
   )
}
