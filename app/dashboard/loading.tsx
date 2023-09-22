import Link from "next/link";
import { createServerComponentClient, createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'
import DashboardNav from "@/components/DashboardNav";
import { Skeleton } from "@/components/ui/skeleton";

const page = async () => {
    
    return (
        <div className="flex flex-col h-screen w-screen">
            <DashboardNav/>
            <div className="flex flex-row h-full">
            <div className="flex w-4/6 flex-col w-full relative p-5 bg-background">
            
              <div className="flex flex-col gap-3 mb-6">
              <Skeleton className="w-1/2 h-20"/>
              <Skeleton className="w-1/2 h-20"/>
          <div>
          <Skeleton className="w-1/2 h-20"/>
          </div>
          <Skeleton className="w-1/2 h-20"/>
          </div>
            <div className="flex flex-wrap gap-2  h-fit">
                <Skeleton className="w-1/2 h-20"/>
    
            </div>
    </div>
    </div>
        </div>
    );
}

export default page;