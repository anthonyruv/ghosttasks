import Link from 'next/link'
import { CaretLeftIcon, GitHubLogoIcon, CaretRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import UserForm from '../dashboard/components/user-form'
import Image from 'next/image'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Login() {
  
  return (
    <main className='grid grid-cols-4 w-screen h-screen'>
        <div className='bg-black col-span-1 lg:col-span-0 hidden relative lg:flex'>
          <Image alt='nature' layout='fill' quality={100} src='/goodbg.jpg'/>
          <Card className='z-10 px-5 py-3 border-stone-700 m-4 text-muted-foreground font-inter mt-auto h-fit w-full text-sm'>Thanks for using our platform!</Card>
        </div>
        
        <div className='lg:col-span-3 col-span-4 flex flex-col'>


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
        href="/login"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        Login
        <CaretRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
        </div>


        <div className="mx-auto flex w-full h-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
          <GitHubLogoIcon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
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

{/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link> */}

      {/* <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
        >
          Sign Up
        </button>
        <Messages />
      </form> */}
    </main>

    





    
  )
}
