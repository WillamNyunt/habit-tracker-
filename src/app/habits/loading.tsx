import React from 'react';
import Link from 'next/link';
import Card from '../../components/ui/card';
import HabitsCardGridLoading from '@/components/loading/habitCardGridLoading';
import HabitTrackerCalendar from '@/components/habitTrackerCalendar';

const HabitsConst : React.FC = () => {
    return (
        <>
        <h1>All habits</h1>
        <div className="grid gap-4 grid-cols-3">
          <Card className="col-span-2 flex flex-col">
            <div className="flex w-full justify-between mb-5">
              <h2>Habits</h2>
              <Link href="?modal=true&type=add-habit">
                <button className="button-primary">Add</button>
              </Link>
            </div>
              <HabitsCardGridLoading />
          </Card>
          <Card className="flex flex-col">
            <h2 className="mb-5">Monthly record</h2>
            <div role="status" className="max-w-sm animate-pulse flex flex-col gap-2 justify-between w-full">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className='h-44'>
            <div className="h-full bg-gray-300 dark:bg-gray-600 mb-2.5"></div>
            </div>
          </div>
          </Card>
        </div>
      </>
    )
}

export default HabitsConst;