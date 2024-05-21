import Link from 'next/link';
import { getHabitsAction } from '@/lib/actions';
import DeleteBtn from '../../components/deleteBtn';
import { deleteHabitByIdAction } from '@/lib/actions';

async function Habits() {
    const habits : any =  await getHabitsAction();

    return (
      <>
       {habits.map ((habit : any) => (  
          <div key={habit.id} className="flex justify-between">
            <span>{habit.name}</span>
            <Link href={`?modal=true&type=edit-habit&id=${habit.id}`}>
            <button className="button-primary">Edit</button>
            </Link>
            <DeleteBtn deleteFn={deleteHabitByIdAction} id={habit.id} />
          </div>
        ))}
      </>
    );
  }

  export default Habits;