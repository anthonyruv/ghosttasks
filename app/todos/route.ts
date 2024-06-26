import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { title } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase.from('todos').insert({ title }).select()
  return NextResponse.json(data)
}