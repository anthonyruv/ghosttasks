""
import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import {AiOutlinePlus} from 'react-icons/ai'
import CreationModal from './creation-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage  } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {Select} from 'antd'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { cookies } from 'next/headers'

const profileFormSchema = z.object({
  // status: z
  //   .string({
  //     required_error: "Please select a project",
  //   }),
  // project: z
  //   .string({
  //     required_error: "Please select a status",
  //   }),
    name: z.string().max(160).min(4, {
      message: "Name must be at least 4 characters.",
    }),
  key: z.string().max(5).min(3, {
    message: "Key must be at least 3 characters.",
  }),
  members: z.array(z.string().email({ message: "Invalid email address" }))
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface projObj {
  name: string,
  key: string,
  lead: string,
  members: string[]
}

const CreateButton = () => {
  const [open, setOnOpen] = useState(false)
  const [projOpen, setProjOpen] = useState(false)
  const [projects, setProjects] = useState([] as any)
  const {toast} = useToast()
  const supabase = createClientComponentClient()
  const form = useForm<ProfileFormValues>({
  resolver: zodResolver(profileFormSchema),
  mode: "onChange",
})
useEffect(() => {
  const getData = async () => {
    const { data } = await supabase.from('projects').select()
    setProjects(data)
  }

  getData()
}, [])
const getUserData = async (id: string) => {
  const { data, error } = await supabase
        .auth.getUser()
        console.log(data, error)
}
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
  function projCreate(data: FormData) {
    supabase.from('projects').insert([
      { name: 'Test', key: 'test', lead: 'test', members: ['test'] },
    ])
  }
  function onSubmit(data: ProfileFormValues) {
    console.log(data.key, data.name)
    supabase.from('projects').insert([
      { name: data.name, key: data.key, members: data.members},
    ])
    .then((response) => {
      console.log(response)
    })
    toast({
      title: "Success! Task was created.",
      description: `${data}, ${data.name}, ${data.key}, ${data.members}`,
      action: <ToastAction onClick={() => console.log('clicked')} altText="details">Details</ToastAction>
    })
  }
    return (
      <div className='flex flex-row gap-2'>
        <Dialog open={projOpen} onOpenChange={setProjOpen}>
          <DialogTrigger asChild><Button>Projects</Button></DialogTrigger>
          <DialogContent className='max-w-4xl'>
            <DialogTitle>Projects</DialogTitle>
            <DialogDescription>Here, you can manage all of your projects. Add, edit, or delete members of groups.</DialogDescription>
            <div className="w-full p-[1px] bg-foreground/10" />
            <div className='flex flex-row justify-between'>
<p className='text-muted-foreground text-sm underline'>All Projects</p>
<Button className=''>
  <AiOutlinePlus/>
  <span className='ml-2'>Create Project</span>
</Button>
</div>
            <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Member(s)</TableHead>
          <TableHead className="text-right">Lead</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project: projObj) => (
          <TableRow >
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.key}</TableCell>
            <TableCell>{project.members.length}</TableCell>
            <TableCell className="text-right">{project.lead}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
  <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder='Name' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="key"
    render={({field}) => (
      <FormItem>
        <FormLabel>Key</FormLabel>
        <FormControl>
          <Input placeholder='Key' className='uppercase' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="members"
    render={({field}) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
        <Select
    mode="tags"
    style={{ width: '100%' }}
    placeholder="Emails of members"
    onChange={field.onChange}
  />
        </FormControl>
        <FormDescription className='italic'>
          Enter the emails of the members you want to add to this project.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  <Button className='flex justify-end' type="submit">Update profile</Button>
  </form>
</Form>

            <DialogFooter>
              <Button variant='ghost' onClick={() => setProjOpen(false)}>Close</Button>
              </DialogFooter>
              
            
          </DialogContent>
        </Dialog>
      <CreationModal isOpen={open} setOpen={setOnOpen}>
      <Button variant={'outline'} className="rounded-md flex text-foreground" size={'icon'}><AiOutlinePlus/></Button>
      </CreationModal>
      </div>
    );
}

export default CreateButton;