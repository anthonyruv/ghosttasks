"use client"

import React,{useState, useEffect} from 'react';
import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { BsSun, BsMoonStars} from 'react-icons/bs'
import {GrPersonalComputer} from 'react-icons/gr'

const ThemeSwitcher = () => {
    const { setTheme: setMode, resolvedTheme: mode } = useTheme()
    useEffect(() => {
        console.log(mode);
      }, [mode]);
    return (
        <Popover>
      <PopoverTrigger asChild>
        <Button variant={'link'} className='underline text-background'>
            Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background border-slate-800 flex flex-col gap-3">
        <p className='text-2lg text-background font-jetbrains-mono'>Customize Theme</p>
        <div className='flex flex-row justify-between'>
        <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    if (mode !== "light") {
                      setMode("light");
                    }
                  }}
                  className={cn(mode === "light" && "border-2 bg-red-500 border-primary",'text-background')}
                >
                  <BsSun className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    if (mode !== "dark") {
                      setMode("dark");
                    }
                  }}
                  className={cn(mode === "dark" && "border-2 bg-red-500 border-primary", 'text-background')}
                >
                  <BsMoonStars className="mr-1 -translate-x-1" />
                  Dark
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    if (mode !== "system") {
                      setMode("system");
                    }
                  }}
                  className={cn(mode === "system" && "border-5 bg-red-500 border-primary", 'text-background')}
                >
                  <GrPersonalComputer className="mr-1 -translate-x-1" />
                  System
                </Button>
        </div>
      </PopoverContent>
    </Popover>
        
    );
}

export default ThemeSwitcher;