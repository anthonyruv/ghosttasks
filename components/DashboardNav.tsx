import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import ThemeSwitcher from "./ThemeSwitcher";

const DashboardNav = () => {
    return (
        <div className="flex justify-evenly p-5 items-center border-b border-b-background/10 bg-background h-16">
            <div className="flex items-center gap-1">
            <Button variant={'outline'} className="text-foreground"><Link href='/'>GhostTasks</Link></Button>
                <Button variant={'link'} className="text-foreground">
                    <Link href='/'>
                    Home
                    </Link>
                </Button>
                </div>
                <div className="flex flex-row">
                <ThemeSwitcher/>
                <LogoutButton/>
            </div>
            
        </div>
    );
}

export default DashboardNav;