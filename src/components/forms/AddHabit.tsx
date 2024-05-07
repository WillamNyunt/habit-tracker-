import { useFormState } from "react-dom";
import { addHabit } from "@/lib/actions";

interface AddHabitFormProps {
  handleModalClose: () => void;
}

export default function AddHabitForm(props: AddHabitFormProps) {
  const [state, formAction] = useFormState(addHabit, { message: "" });
  return (
    <form className="flex flex-col gap-3 w-full" action={formAction}>
      <h2>Add habit</h2>
      <input type="text" name="name" placeholder="Name" />
      {state.message && <p>{state.message}</p>}
      <div className="flex justify-between mt-3">
      <button
        type="button"
        className="bg-slate-800 text-white p-2 rounded-md"
        onClick={props.handleModalClose}
      >
        Close Modal
      </button>
      <button>Create</button>
      </div>
    </form>
  );
}
