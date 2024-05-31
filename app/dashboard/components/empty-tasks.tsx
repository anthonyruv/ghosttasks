"use client"
import React, {useState} from 'react'
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
import CreationModal from './creation-modal'

const EmptyTasks = () => {
  const [onOpen, setOnOpen] = useState(false)
    return (
        <CreationModal isOpen={onOpen} setOpen={setOnOpen}>
        <Card className="w-96 h-72 flex items-center justify-center flex-col border-4 border-dashed gap-2 hover:cursor-pointer bg-stone-900">
      <p className="text-lg font-inter font-medium">
      No tasks found
      </p>
      <p className="text-sm text-muted-foreground font-inter ">
      Create a new task, or click me to get started!
      </p>
      </Card>
      </CreationModal>
    );
}

export default EmptyTasks;