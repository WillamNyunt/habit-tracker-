"use client";
import React, {useRef} from "react";
import { checkHabitFormAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import classes from "./CheckHabit.module.css";
import { usePathname } from "next/navigation";


/**
 * 
 * @param habit_id  
 * @returns 
 */
const CheckHabitForm: React.FC<{ habitId: string, date: string, check: boolean }> = ({ habitId, date, check }) => {
  const [state, formAction] = useFormState(checkHabitFormAction, { message: "" });
  const { pending } = useFormStatus();
  const path = usePathname();

  return (
    <form action={formAction}>
      <input type="hidden" name="habit_id" value={habitId} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="revalidatePath" value={path} />
      <button type="submit" className={check ? classes['check-filled'] : classes['check-empty']} disabled={pending}></button>
      {state?.message && <p>{state.message}</p>}
      {pending && <p>Checking...</p>}
    </form>
  )
}

export default CheckHabitForm;