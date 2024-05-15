import { NextResponse, NextRequest } from 'next/server'
import { getHabitChecksByMonth } from '@/lib/habits'
import moment from 'moment'
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    if (!date) {
        return NextResponse.json({ error: 'No date provided' }, { status: 400 })
    }

    if (!moment(date, 'YYYY-MM-DD').isValid()) {
        return NextResponse.json({ error: 'Invalid date provided' }, { status: 400 })
    }

    const formattedDate = moment(date).format('YYYY-MM')

    const habits = await getHabitChecksByMonth(formattedDate) as { habit_id: string, check_date: string, notes: string }[]

    const dateToFrequencyArr = [] as {date: string, frequency: number}[]

    habits.forEach(habit => {
        const date = habit.check_date
        // in date to frequency array, find the date and increment the frequency if date does not exist add date
        const dateIndex = dateToFrequencyArr.findIndex(dateObj => dateObj.date === date)
        if (dateIndex === -1) {
            dateToFrequencyArr.push({ date, frequency: 1 })
        } else {
            dateToFrequencyArr[dateIndex].frequency++
        }   
    })

  return NextResponse.json(dateToFrequencyArr)
}