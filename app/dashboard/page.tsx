import Link from "next/link";
import { createServerComponentClient, createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'
import DashboardNav from "@/components/DashboardNav";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button";
import DashboardSteps from "@/components/DashboardSteps";
import {AiOutlinePlus} from 'react-icons/ai'
import PropertiesField from "./components/PropertiesField";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const page = async () => {
    const supabase = createServerComponentClient({ cookies })
  const { data: todos } = await supabase.from('todos').select()
  const getDayName = (date: Date) => {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      weekday: 'long', // Full day name (e.g., Wednesday)
      hour: 'numeric', // Numeric hour (e.g., 4)
      minute: 'numeric', // Numeric minute (e.g., 01)
      hour12: true, // Use 12-hour time format with AM/PM
    });
  
    return formattedDate;
};
const getDayNumber = (date: Date) => {
  const numericDate = new Date(date).toLocaleDateString('en-US', {
    year: '2-digit', // Two-digit year (e.g., 23)
    month: '2-digit', // Two-digit month (e.g., 09)
    day: '2-digit', // Two-digit day (e.g., 10)
});
return numericDate;
}
const addTodo = async (formData: FormData) => {
  'use server'
  const formTitle = formData.get('title')
  const formDescription = formData.get('description')

  if (formTitle) {
    // Create a Supabase client configured to use cookies
    const supabase = createServerActionClient({cookies})

    // This assumes you have a `todos` table in Supabase. Check out
    // the `Create Table and seed with data` section of the README 👇
    // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
    await supabase.from('todos').insert({ title: formTitle, description: formDescription })
    revalidatePath('/dashboard')
  }
}
    return (
        <div className="flex flex-col h-screen w-screen">
            <DashboardNav/>
            <div className="flex flex-row h-full">
              <DashboardSteps todos={todos}/>
            <div className="flex w-4/6 flex-col w-full relative p-5 bg-foreground">
            <Dialog >
      <DialogTrigger asChild>
        <Button variant={'outline'} className="rounded-md flex absolute right-4 text-background dark:border-slate-500" size={'icon'}><AiOutlinePlus/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={addTodo}>
        <DialogHeader>
          <DialogTitle>Task Creation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task Title
            </Label>
            <Input name="title" placeholder="Task Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input name="description" placeholder='Description'className="col-span-3" />
          </div>
          
        </div>
        <DialogFooter> 
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
              <div className="flex flex-col gap-3 mb-6">
            <h3 className="scroll-m-20 text-2xl font-semibold text-background tracking-tight">
            Tasks Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">Here, you can manage everything you need.</p>
          <div>

          </div>

          </div>
            <div className="flex flex-wrap gap-2  h-fit">
              
    {todos?.map(({ id, created_at, title, is_complete, user_id, description, color }) => (
      <Sheet>
      <SheetTrigger asChild>
      <div>
        <Badge className="py-1 font-jetbrains-mono w-full rounded-b-none flex justify-between bg-background text-foreground hover:text-background"><p>{getDayName(new Date(created_at))}</p><p>{getDayNumber(new Date(created_at))}</p></Badge>
        <Card key={id} className="w-64 hover:opacity-70 hover:bg-blue-200 hover:cursor-pointer ease-in duration-300 rounded-t-none bg-foreground dark:border-slate-400">
                <CardHeader className="flex flex-row truncate">
                    <div className="flex flex-col gap-2">
                    <CardTitle className="truncate text-background">{title}</CardTitle>
                    <CardDescription className="font-jetbrains-mono">{description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-1 pb-4 px-2 flex justify-end">
                <span style={{background:color}} className="flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0" />
                </CardContent>
              </Card>
              </div>
      </SheetTrigger>
      <PropertiesField id={id} taskColor={color} title={title} description={description} date={created_at}/>
    </Sheet>  
            ))}
            </div>
    <p className="text-xs">
    {JSON.stringify(todos, null, 2)}
    </p>
    </div>
    </div>
        </div>
    );
}

export default page;