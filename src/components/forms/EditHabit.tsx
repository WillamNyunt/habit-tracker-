import { useFormState } from "react-dom";
import { editHabitAction, getHabitByIdAction } from "@/lib/actions";
import { Suspense, useEffect, useRef } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";

interface EditHabitFormProps {
  handleModalClose: () => void;
}

interface Habits {
    name: string;
    id: string;
    slug: string;
}

const  EditHabitForm : React.FC<EditHabitFormProps> =  (props) => {
  const [formState, formAction] = useFormState(editHabitAction, { message: "" });
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchHabit() {
      const habit = await getHabitByIdAction(id) as Habits;
      if (!habit) {
        return;
      }
      if (nameInputRef.current) {
        nameInputRef.current.value = habit.name;
      }
    }
    fetchHabit();
  }, [id]);

  return (
    <form className="flex flex-col gap-3 w-full" action={formAction}>
      <h2>Edit habit</h2>
        <input ref={nameInputRef} type="text" name="name" placeholder="Name" required/>
        <input type="hidden" name="id" value={id} />
      {formState?.message && <p>{formState.message}</p>}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          className="bg-slate-800 text-white p-2 rounded-md"
          onClick={props.handleModalClose}
        >
          Close Modal
        </button>
        <button>Edit</button>
      </div>
    </form>
  );
}

export default EditHabitForm;