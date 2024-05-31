import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { MdOutlineSwapHoriz } from 'react-icons/md'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {LuPencil} from 'react-icons/lu'
import {AiOutlinePlus} from 'react-icons/ai'
import {PiPencilSimpleLight} from 'react-icons/pi'
import {TbTrash} from 'react-icons/tb'
import { revalidatePath } from "next/cache";
import StepButtons from "./StepButtons";
import { Card } from "./ui/card";
import { AiOutlinePlusCircle } from "react-icons/ai";
import EmptySteps from "@/app/dashboard/components/empty-steps";
import CreationModal from "@/app/dashboard/components/creation-modal";
import TeamSwitcher from "@/app/dashboard/components/team-switcher";

const DashboardSteps = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: todos } = await supabase.from('todos').select()
    return (
        <div className="flex flex-col p-5 w-96 h-full border-r border-r-foreground/10 bg-background">
            <div className="flex flex-row justify-between items-center text-background">
            <TeamSwitcher/>
            <Button variant={'ghost'} size={'icon'} className="flex text-foreground">
                <MdOutlineSwapHoriz className="h-5 w-5"/>
            </Button>
            </div>
            <div className="flex flex-col gap-2 text-slate-500">
                {todos?.length === 0 ? (
                    <EmptySteps/>
                ) : (
                    
                    todos?.map((todo) => (
                <button className="flex group border dark:border-stone-800 rounded-md flex-row gap-1 border-stone-200 bg-background">
                    <span className="flex w-1 h-full rounded-l-md" style={{background:todo.color}}></span>
                    <div className="py-2 px-2 text-foreground">
                    <p className="font-inter font-bold w-fit">{todo.title}</p>
                    <p className="font-inter w-fit text-sm">{todo.description}</p>
                    </div>
                    </button>)
                
            ))}
        </div>
        </div>
    );
}

export default DashboardSteps;