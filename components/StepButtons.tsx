"use client"
import React, {useState} from 'react'
import { PiPencilSimpleLight } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "./ui/use-toast";
import { ToastAction } from './ui/toast';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';

interface props {
    id: String;
}

const StepButtons: React.FC<props> = (taskId: props) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const supabase = createClientComponentClient()
    const {toast} = useToast()
    const router = useRouter()
    const handleDelete = async (id: String) => {
        const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        router.refresh()
        {error ? toast({
            title: 'Error Occured',
            description: `${error.message}`
          }): toast({
            title: 'Task Deleted Successfully',
            action: <ToastAction altText="details">Create New</ToastAction>,
          })}
    }
    return (
        <div className='flex flex-row'>
            <PiPencilSimpleLight className="hover:text-stone-600" />
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogTrigger>
        <TbTrash className="hover:text-stone-600"/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
        <p className='text-sm text-muted-foreground'>This action cannot be undone. This will permanently delete this task from our servers.</p>
        <AlertDialogFooter>
            <Button onClick={() => setShowDeleteAlert(false)}>Cancel</Button>
            <Button onClick={async () => {
                setIsDeleteLoading(true)
                await handleDelete(taskId.id)
                setIsDeleteLoading(false)
            }} variant='destructive'>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
    );
}

export default StepButtons;