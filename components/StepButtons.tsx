"use client"
import React from 'react'
import { PiPencilSimpleLight } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "./ui/use-toast";

interface props {
    id: String;
}

const StepButtons: React.FC<props> = (taskId: props) => {
    const supabase = createClientComponentClient()
    const {toast} = useToast()
    const handleDelete = async (id: String) => {
        const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        {error ? toast({
            title: 'Error Occured',
            description: `${error.message}`
          }): toast({
            title: 'Todo Deleted',
            description: `Todo with id ${id} deleted successfully`
          })}
    }
    return (
        <div>
            <PiPencilSimpleLight className="hover:text-stone-600" /><TbTrash className="hover:text-stone-600" onClick={() => handleDelete(taskId.id)}/>
        </div>
    );
}

export default StepButtons;