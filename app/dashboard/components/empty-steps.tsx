"use client"

import React, {useState} from 'react'
import {FiStar} from 'react-icons/fi'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CreationModal from './creation-modal'

const EmptySteps = () => {
    const [open, setOnOpen] = useState(false)
    return (
        <CreationModal isOpen={open} setOpen={setOnOpen}>
        <Card className="p-5 hover:cursor-pointer">
                <div className='flex gap-2 flex-row'>
          <FiStar className='w-8 h-8'/>

            <div className='flex flex-col'>
<p className="text-lg font-inter font-medium">
      No tasks found
      </p>
      <p className="text-sm text-muted-foreground font-inter">
      Create a new task, or click me to get started!
      </p>
</div>

          </div></Card>
          </CreationModal>
    );
}

export default EmptySteps;