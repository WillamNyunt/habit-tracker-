import { useFormState } from "react-dom"
import { addHabit } from "@/lib/actions";

export default function AddHabitForm() {
    const [state, formAction] = useFormState(addHabit, { message: "" })
    return (
        <form action={formAction}>
            <input type="text" name="name" placeholder="Habit name" />
            {state.message && <p>{state.message}</p>}
            <button>Add habit</button>
        </form>
    )
}