import React from 'react'
import SlimBar from '../../../public/components/ui/bar'

export default function HabitsPage() {
    return (
        <>
        <h1>
           Habits
        </h1>
        <SlimBar>
            <button className='self-end'>Add habit</button>
        </SlimBar>        
        </>
    )
}
