'use server'

import { saveHabitDb } from "./habits"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addHabitAction(prevState : {message : string}, formData : FormData) {
    const data = {
        name: formData.get('name') as string
    }

    if (!data.name) {
        return { message: "Name is required" }
    }
    
    await saveHabitDb(data)

    revalidatePath('/habits')
    redirect('/habits')
}
