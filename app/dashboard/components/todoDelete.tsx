"use client"
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const TodoDelete = (id) => {
    const supabase = createClientComponentClient()
const {router} = useRouter()
    const deleteTodo = async (id: string) => {
        const supabase = createClientComponentClient()
        await supabase.from('todos').delete().match({ id: id })
        router.push('/dashboard')
    }
    return (
        <Button onClick={() => deleteTodo(id)}>
            Enter
        </Button>
    );
}

export default TodoDelete;