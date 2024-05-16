import Card from "@/components/ui/card";

function HabitCardGridLoading() {
  // make arbitary array of habits
  const habits = [
    { habit_id: 1 },
    { habit_id: 2 },
    { habit_id: 3 },
    { habit_id: 4 },
    { habit_id: 5 },
    { habit_id: 6 },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {habits.map((habit: any) => (
        <Card key={habit.habit_id}>
          <div role="status" className="max-w-sm animate-pulse flex flex-row justify-between w-full">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="w-12">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default HabitCardGridLoading;
