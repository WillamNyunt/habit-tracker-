import CheckHabitForm from "@/components/forms/CheckHabit";
import { getHabitChecksByDateAction } from "@/lib/actions";

interface HabitCheckColumnProps {
  habits: any[];
  date: string;
}

const HabitCheckColumn: React.FC<HabitCheckColumnProps> = async ({
  habits,
  date,
}) => {
  const dateHabit = await getHabitChecksByDateAction(date) as any[];
    return (
    <div className="flex gap-2 flex-col pt-5 pb-5 pl-2 pr-2 rounded bg-slate-100">
      {habits.map((habit: any) => (
        <div
          className="flex flex-row justify-between pr-4 pt-2 pb-2 pl-2 border-2 border-blue-400 border-spacing-1 rounded"
          key={habit.habit_id}
        >
          {habit.name}
          <CheckHabitForm
            habitId={habit.habit_id}
            date={date}
            check={dateHabit.some(
              (check: any) => check.habit_id === habit.habit_id
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default HabitCheckColumn;
