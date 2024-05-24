import { useFormState } from "react-dom";
import { editHabitAction, getHabitByIdentifierAction } from "@/lib/actions";
import { Suspense, useEffect, useRef } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";

interface EditHabitFormProps {
  handleModalClose: () => void;
}

interface Habits {
  name: string;
  id: string;
  time_of_day: string;
}

const EditHabitForm: React.FC<EditHabitFormProps> = (props) => {
  const [formState, formAction] = useFormState(editHabitAction, {
    message: "",
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const timeOfDayInputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    async function fetchHabit() {
      await getHabitByIdentifierAction(id).then((res: unknown) => {
        const response = JSON.parse(res as string);
        const habit: Habits = response.data;
        if (nameInputRef.current) {
          nameInputRef.current.value = habit.name;
        }
        if (timeOfDayInputRef.current) {
          timeOfDayInputRef.current.value = habit.time_of_day ? habit.time_of_day : "all";
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    fetchHabit();
  }, [id]);

  return (
    <form className="flex flex-col gap-3 w-full" action={formAction}>
      <h2>Edit habit</h2>
      <label htmlFor="name">Name</label>
      <input
        ref={nameInputRef}
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <label htmlFor="time_of_day">Time of day</label>
      <select ref={timeOfDayInputRef} name="time_of_day">
        <option value="all">All</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      <input type="hidden" name="id" value={id} />
      {formState?.message && <p>{formState.message}</p>}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          className="bg-slate-800 text-white p-2 rounded-md"
          onClick={props.handleModalClose}
        >
          Close
        </button>
        <button>Edit</button>
      </div>
    </form>
  );
};

export default EditHabitForm;
