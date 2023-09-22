"use client"

import React, {useState} from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "antd";
import {TbTrash} from 'react-icons/tb'
import {GoPencil} from 'react-icons/go'
import {BiSolidColor} from 'react-icons/bi'
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {VscCalendar} from 'react-icons/vsc'
import { format } from "date-fns";
import cn from "classnames";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface IdObject {
    id: string;
  }

interface props {
    id: IdObject;
    taskColor: string;
    title: string;
    description: string;
    date: Date;
}

interface DataField {
  title: string;
  date: Date;
}

const PropertiesField: React.FC<props> = ({ id, taskColor, title, description, date }) => {
    const [editing, setEditing] = useState('default')
    const [color, setColor] = useState(taskColor.toString())
    const [sheetTitle, setSheetTitle] = useState(title)
    const [sheetDescription, setSheetDescription] = useState(description)
    const [sheetDate, setSheetDate] = useState(date)
    const [sheetColor, setSheetColor] = useState(taskColor)
    const {toast} = useToast()
    const form = useForm()
    const router = useRouter()
    const supabase = createClientComponentClient()
    const deleteTodo = async () => {
        const { error } = await supabase
  .from('todos')
  .delete()
  .eq('id', id)
  {error ? toast({
        title: 'Error Occured',
        description: `${error.message}`
      }): toast({
        title: 'Task Deleted',
        description: "Friday, February 10, 2023 at 5:57 PM"
      }); router.push('/')  }
    
    }
    const handleColorChange = async (open: boolean) => {
      if (taskColor === color) {
        toast({
          title: 'Color Unchanged',
          description: 'You did not specify a different color'
        })
      } else {
        console.log(taskColor, color, id, id.id, 'before change')
        const { error } = await supabase
        .from('todos')
        .update({color: color})
        .eq('id', id.toString())
        error ? toast({
          title: 'Error Occured',
          description: `${error.message}`
        }): toast({
          title: 'Color Changed',
          description: 'You changed the color of the task'
        })
        console.log(taskColor, color, 'after change')
      }
    }
    const onSubmit = async (data: DataField) => {
      const date = data.date
      const newTitle = sheetTitle
      console.log(date,newTitle, 'form data')
    }
    return (
      <SheetContent className="bg-foreground border-stone-800">
      <SheetHeader>
        <SheetTitle className="text-background">Edit Task</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-background'>Title</FormLabel>
              <FormControl>
                <Input className='text-background' {...field} value={sheetTitle} onChange={(e) => setSheetTitle(e.target.value)} />
              </FormControl>
              <FormDescription>
                This is the title of your task.
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
              <FormLabel className='text-background'>Description</FormLabel>
              <FormControl>
                <Input className='text-background' {...field} value={sheetDescription} onChange={(e) => setSheetDescription(e.target.value)} />
              </FormControl>
              <FormDescription>
                This is the description of your task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className='text-background'>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                        field.value && "text-background"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <VscCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className='text-background'>Color</FormLabel>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                        field.value && "text-background"
                      )}
                    >
                      {!field.value ? sheetColor : field.value}
                      <ColorPicker value={sheetColor} onChange={(e) => setSheetColor(e.toString())}/>
                    </Button>
                  </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => console.log(sheetColor)}>Log</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
            
    );
}

export default PropertiesField;