import { z } from 'zod'

const client = z.object({
   NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3000').optional(),
})

const server = z.object({
   DB_URL: z.string(),
   BETTER_AUTH_SECRET: z.string(),
   BETTER_AUTH_URL: z.url().default('http://localhost:3000').optional(),
})

type ClientEnv = z.infer<typeof client>
type ServerEnv = z.infer<typeof server>

const createEnv = (): {
   client: ClientEnv
   server: ServerEnv
} => {
   if (process.env.SKIP_ENV_VALIDATION !== 'true') {
      const isServer = typeof window === 'undefined'

      const clientParsed = client.safeParse(process.env)
      const serverParsed = isServer
         ? server.safeParse(process.env)
         : { success: true, data: {} as ServerEnv }

      if (clientParsed.success === false) {
         console.error(
            '❌ Invalid client environment variables:',
            clientParsed.error.flatten().fieldErrors,
         )
         throw new Error('Invalid client environment variables')
      }

      if (isServer && serverParsed.success === false) {
         if ('error' in serverParsed) {
            console.error(
               '❌ Invalid server environment variables:',
               serverParsed.error.flatten().fieldErrors,
            )
         } else {
            console.error(
               '❌ Invalid server environment variables: (nieznany błąd walidacji)',
            )
         }
         throw new Error('Invalid server environment variables')
      }

      return {
         client: clientParsed.data,
         server: new Proxy(serverParsed.data as ServerEnv, {
            get(target, prop) {
               if (!isServer) {
                  throw new Error(
                     '❌ Attempted to access server environment variables on the client',
                  )
               }
               return target[prop as keyof typeof target]
            },
         }),
      }
   } else {
      return {
         client: {} as ClientEnv,
         server: {} as ServerEnv,
      }
   }
}

const env = createEnv()

export { env }
