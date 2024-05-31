import React, {useState, ReactNode, Dispatch, SetStateAction} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
    import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {AiOutlinePlus} from 'react-icons/ai'
import { Label } from '@/components/ui/label'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ColorPicker } from 'antd'
import type {Color} from 'antd/lib/color-picker'
import { Badge } from '@/components/ui/badge'




const profileFormSchema = z.object({
    // status: z
    //   .string({
    //     required_error: "Please select a project",
    //   }),
    // project: z
    //   .string({
    //     required_error: "Please select a status",
    //   }),
      title: z.string().max(160).min(4),
    description: z.string().max(160).min(4),
    tag: z.string({
      required_error: "Please select an email to display.",
    }),
  })
  
  type ProfileFormValues = z.infer<typeof profileFormSchema>

  interface ModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
  }

const CreationModal : React.FC<ModalProps> = ({ isOpen, setOpen, children }) => {
    const router = useRouter()
    const {toast} = useToast()
    const [color, setColor] = useState<Color | string>('blue')
    const supabase = createClientComponentClient()
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
      })

      async function onSubmit(data: ProfileFormValues) {
        console.log('submit')
          await supabase.from("todos").insert([
            {
            title: data.title,
            description: data.description,
            tag: data.tag
          }
          ])
          setOpen(false)
          router.refresh()
          console.log(data)
          toast({
            title: "Success! Task was created.",
            description: "You can find it on the dashboard.",
            action: <ToastAction onClick={() => console.log('clicked')} altText="details">Details</ToastAction>
          })
        }
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-64">
        <DialogHeader className='mb-5'>
          <DialogTitle>Task Creation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kaban">Kaban</SelectItem>
                  <SelectItem value="exampleproject">Example Project</SelectItem>
                  <SelectItem value="ghosttasks">Ghost Tasks</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Attach this task to a project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kaban">Kaban</SelectItem>
                  <SelectItem value="exampleproject">Example Project</SelectItem>
                  <SelectItem value="ghosttasks">Ghost Tasks</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Display a status for this task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="w-full p-[1px] bg-foreground/10" />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Task title"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add a title to make your task easily recognizable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can give your task a description of up to <span className='font-medium'>250 characters</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
                <div className="w-full p-[1px] bg-foreground/10" />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl >
              <Select onValueChange={field.onChange} defaultValue={field.value}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="No Tag"/>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="todo" className='hover:bg-gray-300'><Badge className='font-jetbrains-mono text-stone-700 bg-gray-200'>To Do</Badge></SelectItem>
    <SelectItem value="inprogress"><Badge className='font-jetbrains-mono bg-blue-200 text-blue-400'>In Progress</Badge></SelectItem>
    <SelectItem value="done"><Badge className='font-jetbrains-mono bg-green-200 text-green-700'>Done</Badge></SelectItem>
  </SelectContent>
</Select>
              </FormControl>
              
              <FormDescription>
                You can give your task a description of up to <span className='font-medium'>250 characters</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='flex justify-end' type="submit">Update profile</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
    );
}

export default CreationModal;