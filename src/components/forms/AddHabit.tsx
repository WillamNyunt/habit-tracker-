import { AddHabitBtn } from './AddHabitBtn';
import { useFormState } from "react-dom";
import { addHabitAction } from "@/lib/actions";
import { useState } from "react";

interface AddHabitFormProps {
  handleModalClose: () => void;
}

export default function AddHabitForm(props: AddHabitFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await addHabitAction(new FormData(e.target as HTMLFormElement));
    setIsLoading(false);
  }

  return (
    <form className="flex flex-col gap-3 w-full" onSubmit={formAction}>
      <h2>Add habit</h2>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" placeholder="Name" />
      <label htmlFor="time_of_day">Time of day</label>
      <select name="time_of_day">
        <option value="all">All</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      <div className="flex justify-between mt-3">
      <button type="button" className="bg-slate-800 text-white p-2 rounded-md" onClick={props.handleModalClose}>
        Close
      </button>
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add"}
      </button>
      </div>
    </form>
  );
}
