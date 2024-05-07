import { useFormState } from "react-dom";
import { addHabit } from "@/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AddHabitFormProps {
  handleModalClose: () => void;
}

export default function AddHabitForm(props : AddHabitFormProps) {
  const [state, formAction] = useFormState(addHabit, { message: "" });
  const pathname = usePathname();
  return (
    <form action={formAction}>
      <h2>Add habit</h2>
      <input type="text" name="name" placeholder="Name" />
      {state.message && <p>{state.message}</p>}
      <button
        type="button"
        className="bg-red-500 text-white p-2"
        onClick={props.handleModalClose}
      >
        Close Modal
      </button>
      <button>Create</button>
    </form>
  );
}
