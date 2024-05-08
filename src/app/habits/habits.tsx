import Link from 'next/link';
import { getHabits } from '@/lib/habits';
import HabitsDeleteBtn from './habitsDeleteBtn';

async function Habits() {
    const habits : any =  await getHabits();
    console.log(habits)
  
    return (
      <>
       {habits.map ((habit : any) => (
          <div key={habit.id} className="flex justify-between">
            <span>{habit.name}</span>
            <Link href={`?modal=true&type=edit-habit&id=${habit.id}`}>
            <button className="button-primary">Edit</button>
            </Link>
            <HabitsDeleteBtn id={habit.id} />
          </div>
        ))}
      </>
    );
  }

  export default Habits;