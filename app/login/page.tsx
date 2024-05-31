import Link from 'next/link'
import Messages from './messages'
import { CaretLeftIcon, CaretRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import UserForm from '../dashboard/components/user-form'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Login() {
  
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className='flex justify-between p-5'>
        <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <CaretLeftIcon
          className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
        />
        Back
      </Link>
          
      <Link
        href="/signup"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        Sign Up
        <CaretRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
        </div>
      <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <GitHubLogoIcon className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
          </p>
        </div>
        <UserForm/>
        <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            > 
              Privacy Policy
            </Link>
            .
          </p>
          
      </div>
    </div>





    
  )
}
