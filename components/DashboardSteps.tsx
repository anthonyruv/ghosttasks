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

const DashboardSteps = async ({todos}) => {
    const supabase = createServerComponentClient({cookies})
    const handleDelete = async (id: String) => {       
        const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        {error ? console.log(error.message): revalidatePath('/dashboard')}
    }
    return (
        <div className="flex flex-col p-5 w-96 h-full border-r border-r-background/10 bg-foreground">
            <div className="flex flex-row justify-between items-center text-background">
            <p className="flex font-medium h-fit">Quick Access</p>
            <Button variant={'ghost'} size={'icon'} className="flex">
                <MdOutlineSwapHoriz className="h-5 w-5"/>
            </Button>
            </div>
            <div className="flex flex-col gap-2 text-slate-500">
            {todos.map(({id, title, description, color}) => (
                <button className="flex px-4 py-2 group border border-slate-800 rounded-md justify-between">{title}<span className="hidden flex gap-1 group-hover:flex my-auto">
                <StepButtons id={id}/>
                </span></button>
            ))}
        </div>
        </div>
    );
}

export default DashboardSteps;