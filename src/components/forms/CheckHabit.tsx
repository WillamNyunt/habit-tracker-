"use client";
import React, {useRef} from "react";
import { checkHabitFormAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import classes from "./CheckHabit.module.css";
import { usePathname } from "next/navigation";


/**
 * 
 * @param habit_id  
 * @returns 
 */
const CheckHabitForm: React.FC<{ habitId: string, date: string, check: boolean }> = ({ habitId, date, check }) => {
  const [state, formAction] = useFormState(checkHabitFormAction, { message: "" });
  const path = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //* This makes optmistic update to the button to show that the habit has been checked, if invalid the button will revert back to its original state *//
    buttonRef.current?.classList.add(classes['check-filled']);
  };


  return (
    <form action={formAction} onSubmit={handleFormSubmit}>
      <input type="hidden" name="habit_id" value={habitId} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="revalidatePath" value={path} />
      <button type="submit" ref={buttonRef} className={check ? classes['check-filled'] : classes['check-empty']}></button>
      {state?.message && <p>{state.message}</p>}
    </form>
  )
}

export default CheckHabitForm;