import { NextResponse } from 'next/server'
import { getHabits } from '@/lib/habits'

export async function GET(request: Request) {
    const habits = await getHabits()
  return NextResponse.json({ habits })
}