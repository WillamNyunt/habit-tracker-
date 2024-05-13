"use client";
import Link from "next/link";

interface HabitCheckGridProps {
    habits: any[];
}

const HabitCheckGrid: React.FC<HabitCheckGridProps> = ({habits}) => {
  return <div className="flex gap-2 flex-col pt-5 pb-5 pl-2 pr-2 rounded bg-slate-100">
    {habits.map((habit: any) => (
        <div className="flex flex-row justify-between pr-4 pt-2 pb-2 pl-2 border-2 border-blue-400 border-spacing-1 rounded" key={habit.habit_id}>
            {habit.name}
            <form>
                <input type="checkbox" />
            </form>
        </div>
    ))}
  </div>;
};

export default HabitCheckGrid;
