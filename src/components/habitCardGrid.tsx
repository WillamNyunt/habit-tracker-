import Link from "next/link";
import { getHabitsAction } from "@/lib/actions";
import DeleteBtn from "./deleteBtn";
import { deleteHabitByIdAction } from "@/lib/actions";
import Card from "@/components/ui/card";


async function Habits() {
  const res: any = await getHabitsAction();
  const habits = res.body;
  return (
    <div className="grid grid-cols-3 gap-2">
      {habits.length != 0 && habits.map((habit: any) => (
        <Card key={habit.habit_id} className="flex align-middle">
          <div className="flex justify-between w-full">
            <span className="flex items-center">{habit.name}</span>
            <div className="flex justify-end">
              <Link href={`?modal=true&type=edit-habit&id=${habit.habit_id}`}>
                <button className="button-primary">Edit</button>
              </Link>
              <DeleteBtn deleteFn={deleteHabitByIdAction} id={habit.habit_id} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Habits;
