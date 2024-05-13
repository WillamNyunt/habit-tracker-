"use client";
import React from "react";
import { checkHabitFormAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import classes from "./CheckHabit.module.css";
import { useState } from "react";

/**
 * 
 * @param habit_id  
 * @returns 
 */

const CheckHabitForm : React.FC<{habitId: string, date: string, check: boolean }> = ({habitId, date, check}) => {
    const [state, formAction] = useFormState(checkHabitFormAction, { message: "" });
    console.log(check);
    return (
        <form action={formAction}>
        <input type="hidden" name="habit_id" value={habitId} />
        <input type="hidden" name="date" value={date} />
        <button type="submit" className={check ? classes['check-filled'] : classes['check-empty']}></button>
        {state?.message && <p>{state.message}</p>}
      </form>
    )
}

export default CheckHabitForm;