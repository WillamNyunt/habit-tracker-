'use server'

import client  from "@/lib/clientPromise";

import { saveHabitDb, editHabitDb, getHabitById, deleteHabitDb, getHabits, addDateToHabit, getDateIdByDate, getHabitChecksByDate } from "./habits"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addHabitAction(prevState : {message : string}, formData : FormData) {
    const data = {
        name: formData.get('name') as string,
        time_of_day: formData.get('time_of_day') as string
    }

    if (!data.name) {
        return { message: "Name is required" }
    }

    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    
    await habits.insertOne(data)

    revalidatePath('/habits')
    redirect('/habits')
}

export async function editHabitAction(prevState : {message : string}, formData : FormData) {
    const data = {
        name: formData.get('name') as string,
        id: formData.get('id') as string,
        time_of_day: formData.get('time_of_day') as string
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
    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    const habitList = await habits.find().toArray();

    console.log(habitList)
    return {
        status: 200,
        body: habitList
    }
}

export async function deleteHabitByIdAction(id: string) : Promise<{ message: string | null }> {
    if (!id) {
        return { message: "Id is required" }
    }
    await deleteHabitDb(id)
    revalidatePath('/habits')
    redirect('/habits')
}


export async function checkHabitFormAction(prevState : {message : string}, formData : FormData) {
    const data = {
        date: formData.get('date') as string,
        habit_id: formData.get('habit_id') as string,
        notes: '' as string,
        revalidatePath: formData.get('revalidatePath') as string
    }

    if (!data.habit_id) {
        return { message: "Habit is required" }
    }

    if (!data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return { message: "Date format is incorrect" }
    }

    await addDateToHabit(data)

    revalidatePath(data.revalidatePath)
    redirect(data.revalidatePath)
}

export async function getDateIdByDateAction(date: string) {
    if (!date) {
        return { message: "Date is required" }
    } 
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return { message: "Date format is incorrect" }
    }
    return await getDateIdByDate(date)
}

/**
 * 
 * @param date 
 * @returns returns all habits with the date provided.
 */
export async function getHabitChecksByDateAction(date: string) {
    if (!date) {
        return { message: "Date is required" }
    }
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return { message: "Date format is incorrect" }
    }
    return await getHabitChecksByDate(date)
}