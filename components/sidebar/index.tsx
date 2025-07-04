'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { menuOptions } from '@/lib/constants'
import clsx from 'clsx'
import { Separator } from "@/components/ui/separator"
import { DatabaseIcon, GitBranchIcon, LucideMousePointerClick } from 'lucide-react'
import { ModeToggle } from '../global/modeToggle'



type Props = {}

const SideBar = (props: Props) => {
    const pathName = usePathname();

    return (
        <nav className='dark:bg-black h-screen overflow-scroll flex items-center justify-between flex-col gap-10 py-6 px-2'>
            <div className="flex items-center justify-center flex-col gap-6">
                <Link className='flex font-bold flex-row' href='/'>
                    Automate.
                </Link>

                <TooltipProvider>
                    {menuOptions.map((menuItem) => (
                        <ul key={menuItem.name}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <li >
                                        <Link className={clsx('group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer', { 'dark:bg-[#2F006B] bg-[#EEE0FF': pathName === menuItem.href })} href={menuItem.href}>
                                            <menuItem.Component selected={pathName === menuItem.href} />
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent side='right' className='bg-black/10 backdrop-blur-xl'>
                                    <p>{menuItem.name}</p>
                                </TooltipContent>
                            </Tooltip>


                        </ul>
                    ))}
                </TooltipProvider>
                <Separator className="my-4 h-px w-full dark:bg-white/20 bg-slate-950" />
                <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full ">
                        <LucideMousePointerClick className='dark:text-white text-muted-foreground' size={18} />
                        <div className="dark:bg-white  h-6 w-[2px] absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] bg-black"></div>
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full ">
                        <GitBranchIcon className='dark:text-white text-muted-foreground' size={18} />
                        <div className="dark:bg-white h-6 w-[2px] absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] bg-black"></div>
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full ">
                        <DatabaseIcon className='dark:text-white text-muted-foreground' size={18} />
                        <div className="dark:bg-white h-6 w-[2px] absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] bg-black"></div>
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full ">
                        <GitBranchIcon className='dark:text-white text-muted-foreground' size={18} />
                    </div>

                </div>
            <div className="flex items-center justify-center flex-col gap-8">
                <ModeToggle />
            </div>
            </div>
        </nav>
    )
}

export default SideBar