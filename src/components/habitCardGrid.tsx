import Link from "next/link";
import { getHabits } from "@/lib/habits";
import DeleteBtn from "./deleteBtn";
import { deleteHabitByIdAction } from "@/lib/actions";
import Card from "@/components/ui/card";

async function Habits() {
  const habits: any = await getHabits();

  return (
    <div className="grid grid-cols-3 gap-2">
      {habits.map((habit: any) => (
        <Card key={habit.id} className="flex align-middle">
          <div className="flex justify-between w-full">
            <span className="flex items-center">{habit.name}</span>
            <div className="flex justify-end">
              <Link href={`?modal=true&type=edit-habit&id=${habit.id}`}>
                <button className="button-primary">Edit</button>
              </Link>
              <DeleteBtn deleteFn={deleteHabitByIdAction} id={habit.id} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Habits;
