import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
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
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import CreateButton from "./components/create-button";
import EmptyTasks from "./components/empty-tasks";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import EditingModal from "./components/editing-modal";
import CardItem from "./components/card-item";
import { redirect } from "next/navigation";

const page = async () => {
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session){
      redirect('/login')
    }
  const { data: todos } = await supabase.from('todos').select()
    return (
        <div className="flex flex-col h-screen w-screen">
            <DashboardNav/>
            <div className="flex flex-row h-full">
              <DashboardSteps />
            <div className="flex flex-col w-full relative p-5 bg-background">
            
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-3 mb-6">
            <h3 className="scroll-m-20 text-2xl font-semibold text-foreground tracking-tight">
            Tasks Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">Here, you can manage everything you need.</p>
          </div>
          <div>
<CreateButton/>
          </div>

          </div>
            <div className="flex flex-wrap gap-2  h-fit">
    {todos?.map((todo) => (
      <CardItem key={todo.id} card={todo} />
            ))}
            </div>
    </div>
    </div>
        </div>
    );
}

export default page;