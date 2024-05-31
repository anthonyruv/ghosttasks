import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { BsGoogle } from 'react-icons/bs'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
    email: z.string().email()
  })

const UserForm = () => {
    const supabase = createClientComponentClient()
    const {toast} = useToast()
    let url: URL;
  if (typeof window !== 'undefined') {
    url = new URL(window.location.href);
  }
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
      })
      const oAuthCred = async (cred: string) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: cred === 'google' ? 'google' : 'github',
          options: {
            redirectTo: `${url.origin}/auth/callback`,
          }
        })
      }
    return (
        <Form {...form}>
      <form action='/auth/sign-up' method='post' className="space-y-8 w-[350px] mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Required" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className='w-full rounded-full'>Continue</Button>
        <div className="relative flex flex-row justify-center text-xs uppercase items-center">
            <Separator className='shrink'/>
          <span className="bg-background shrink-0 px-2 text-muted-foreground">
            Or continue with
          </span>
          <Separator className='shrink'/>
        </div>
        <div className='flex flex-col gap-4'>
        <Button onClick={() => oAuthCred('google')} className='font-inter font-semibold py-5 rounded-full'><BsGoogle className='h-4 w-4 mr-2 text-blue-500'/> Continue with Google</Button>
        <Button onClick={() => oAuthCred('github')} className='font-inter font-semibold py-5 rounded-full'><GitHubLogoIcon className='h-4 w-4 mr-2'/> Continue with Github</Button>
        </div>
      </form>
    </Form>
    );
}

export default UserForm;