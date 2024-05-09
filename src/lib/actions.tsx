'use server'

import { saveHabitDb, editHabitDb, getHabitById, deleteHabitDb, getHabits } from "./habits"
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

export async function editHabitAction(prevState : {message : string}, formData : FormData) {
    const data = {
        name: formData.get('name') as string,
        id: formData.get('id') as string
    }

    console.log(data)

    if (!data.name) {
        return { message: "Name is required" }
    }

    await editHabitDb(data)

    revalidatePath('/habits')
    redirect('/habits')
}

export async function getHabitByIdAction(id: string) {
    if (!id) {
        return { message: "Id is required" }
    }
    return await getHabitById(id)
}

export async function getHabitsAction() {
    return await getHabits()
}

export async function deleteHabitByIdAction(id: string) : Promise<{ message: string | null }> {
    if (!id) {
        return { message: "Id is required" }
    }
    await deleteHabitDb(id)
    revalidatePath('/habits')
    redirect('/habits')
}