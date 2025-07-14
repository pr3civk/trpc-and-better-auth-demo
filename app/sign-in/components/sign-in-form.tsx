'use client'

import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

const formSchema = z.object({
   email: z.email({ error: 'Invalid email address' }),
   password: z.string({ error: 'Password is required' }),
})

type FormSchema = z.infer<typeof formSchema>

export function SignInForm() {
   const defaultValues = {
      email: '',
      password: '',
   }

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   function onSubmit(data: FormSchema) {
      authClient.signIn.email(
         {
            email: data.email,
            password: data.password,
            callbackURL: '/',
         },
         {
            onSuccess: () => {
               window.alert('Sign in successful')
               form.reset(defaultValues)
               redirect('/')
            },
            onError: () => {
               window.alert('Sign in failed')
            },
         },
      )
   }

   return (
      <Card className="w-full sm:max-w-sm">
         <CardHeader>
            <CardTitle>Sign Up</CardTitle>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  {Object.entries(formSchema.shape).map(([key]) => {
                     const schemaKey = key as keyof FormSchema
                     return (
                        <FormField
                           key={schemaKey}
                           control={form.control}
                           name={schemaKey}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-sm capitalize">
                                    {schemaKey}
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       type={
                                          schemaKey === 'password'
                                             ? 'password'
                                             : 'text'
                                       }
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )
                  })}
                  <Button type="submit" className="w-full">
                     Sign up
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
