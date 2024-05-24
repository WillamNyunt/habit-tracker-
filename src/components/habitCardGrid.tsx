import Link from "next/link";
import { getHabitsAction } from "@/lib/actions";
import DeleteBtn from "./deleteBtn";
import { deleteHabitByIdAction } from "@/lib/actions";
import Card from "@/components/ui/card";
import { Habit } from "@/types";

async function Habits() {
  const habits = await getHabitsAction();
  return (
    <div className="grid grid-cols-3 gap-2">
      {(Array.isArray(habits) && habits.length !== 0) && habits.map((habit: Habit) => (
        <Card key={habit.identifier} className="flex align-middle">
          <div className="flex justify-between w-full">
            <span className="flex items-center">{habit.name}</span>
            <div className="flex justify-end">
              <Link href={`?modal=true&type=edit-habit&id=${habit.identifier}`}>
                <button className="button-primary">Edit</button>
              </Link>
              <DeleteBtn deleteFn={deleteHabitByIdAction} id={habit.identifier} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Habits;
