import CheckHabitForm from "@/components/forms/CheckHabit";
import { getHabitChecksByDateAction } from "@/lib/actions";
import { HabitCheck } from "@/types";

interface HabitCheckColumnProps {
  habits: any[];
  date: string;
}

const HabitCheckColumn: React.FC<HabitCheckColumnProps> = async ({
  habits,
  date,
}) => {
  const dateHabitResponse = await getHabitChecksByDateAction(date) as { status: number, data: HabitCheck[] } | null;
  const dateHabitJSON = JSON.parse(dateHabitResponse)
  const dateHabit = dateHabitJSON?.data || [];
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2>No habits found</h2>
      </div>
    );
  } else {
    return (
    <div className="flex gap-2 flex-col pt-5 pb-5 pl-2 pr-2 rounded bg-slate-100">
      {habits.map((habit: any) => (
        <div
          className="flex flex-row justify-between pr-4 pt-2 pb-2 pl-2 border-2 border-blue-400 border-spacing-1 rounded"
          key={habit.identifier}
        >
          {habit.name}
          <CheckHabitForm
            habitId={habit.identifier}
            date={date}
            check={dateHabit.length ? (dateHabit.find((check: any) => check.habit_id === habit.identifier) ? true: false)  : false}
          />
        </div>
      ))}
    </div>
  );
}
};

export default HabitCheckColumn;
