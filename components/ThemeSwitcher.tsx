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
    return (
        <Popover>
      <PopoverTrigger asChild>
        <Button variant={'link'} className='underline text-foreground'>
            Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background border-slate-800 flex flex-col gap-3">
        <p className='text-2lg text-foreground font-jetbrains-mono'>Customize Theme</p>
        <div className='flex flex-row gap-2'>
        <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    if (mode !== "light") {
                      setMode("light");
                    }
                  }}
                  className={cn(mode === "light" && "border-2 border-primary",'text-foreground')}
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
                  className={cn(mode === "dark" && "border-2 border-primary", 'text-foreground')}
                >
                  <BsMoonStars className="mr-1 -translate-x-1" />
                  Dark
                </Button>
        </div>
      </PopoverContent>
    </Popover>
        
    );
}

export default ThemeSwitcher;