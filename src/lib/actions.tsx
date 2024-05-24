'use server'

import client from "@/lib/clientPromise";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { Habit, HabitCheck } from "@/types";
import moment from "moment";
const { v4: uuidv4 } = require('uuid');


export async function addHabitAction(prevState: { message: string }, formData: FormData) {
    const data = {
        identifier: uuidv4() as string,
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

export async function editHabitAction(prevState: { message: string }, formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        identifier: formData.get('id') as string,
        time_of_day: formData.get('time_of_day') as string
    }

    console.log(data)

    if (!data.name) {
        return { message: "Name is required" }
    }

    const db = client.db('habit_tracker');
    const habits = db.collection('habits');

    await habits.updateOne({ identifier: data.identifier }, { $set: { name: data.name, time_of_day: data.time_of_day } }).then(
        (result) => {
            console.log(result)
        }
    ).catch((err) => {
        console.log(err)
    })

    revalidatePath('/habits')
    redirect('/habits')
}

export async function getHabitByIdentifierAction(identifier: string) {
    console.log(identifier)
    if (!identifier) {
        return { message: "Id is required" }
    }
    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    const res = await habits.findOne({ identifier: identifier });
    return new Promise((resolve, reject) => {
        if (res) {
            const habit = {
                identifier: res.identifier,
                name: res.name,
                time_of_day: res.time_of_day
            }
            resolve(JSON.stringify({ status: 200, data: habit }))
        } else {
            reject(new Error("Habit not found"))
        }
    })
}

export async function getHabitsAction() {
    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    const habitList = await habits.find().toArray();

    if (!habitList) {
        return { message: "No habits found" }
    }


    const habitsObj: Habit[] = habitList.map(habit => {
        return {
            identifier: habit.identifier,
            name: habit.name,
            time_of_day: habit.time_of_day
        }
    })

    return habitsObj
}

export async function deleteHabitByIdAction(identifier: string): Promise<{ message: string | null }> {
    if (!identifier) {
        return { message: "Id is required" }
    }
    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    await habits.deleteOne({ identifier: identifier }).then(res => console.log(res)).catch(err => console.log(err))
    revalidatePath('/habits')
    redirect('/habits')
}


export async function checkHabitFormAction(prevState: { message: string }, formData: FormData) {
    const data = {
        date: formData.get('date') as string,
        habit_id: formData.get('habit_id') as string,
        notes: '' as string,
    }

    if (!data.habit_id) {
        return { message: "Habit is required" }
    }

    if (!data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return { message: "Date format is incorrect" }
    }

    const db = client.db('habit_tracker');
    const habitChecks = db.collection('habitChecks');
    await habitChecks.insertOne(data).then(res => console.log(res)).catch(err => console.log(err))

    const path = formData.get('revalidatePath') as string
    revalidatePath(path)
    redirect(path)
}

export async function getDateIdByDateAction(date: string) {
    if (!date) {
        return { message: "Date is required" }
    }
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return { message: "Date format is incorrect" }
    }
    const db = client.db('habit_tracker');
    const dates = db.collection('dates');
    const dateObj = await dates.findOne({ date: date });
    return dateObj;
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
    const db = client.db('habit_tracker');
    const habitChecksDb = db.collection('habitChecks');

    const habitChecks = await habitChecksDb.find({ date: date }).toArray()

    return new Promise((resolve, reject) => {   
        if (habitChecks) {
            const habitMap : HabitCheck[] = habitChecks.map((check) => {
                return {
                    date: check.date,
                    habit_id: check.habit_id,
                    notes: check.notes
                }
            })
            resolve(JSON.stringify({ status: 200, data: habitMap }))
        } else {
            reject(new Error("Cannot fetch habit checks."))
        }
    })
}


/**
 * 
 * @param month string
 * @param year string
 * @returns list of habit checks for the month provided. Habit[]
 */
export async function getHabitChecksByMonthAction(month: string, year: string) {
    if (!month) {
        return { message: "Month is required" }
    }
    if (!year) {
        return { message: "Year is required" }
    }
    const db = client.db('habit_tracker');
    const habitChecksDb = db.collection('habitChecks');
    
    const habitChecks = await habitChecksDb.find({ date: { $regex: `^${year}-${month}` } }).toArray()

    return new Promise((resolve, reject) => {
        if (habitChecks) {
            const habitMap : HabitCheck[] = habitChecks.map((check) => {
                return {
                    date: check.date,
                    habit_id: check.habit_id,
                    notes: check.notes
                }
            })
            resolve(JSON.stringify({ status: 200, data: habitMap }))
        } else {
            reject(new Error("Cannot fetch habit checks."))
        }
    })
}

export async function getAllHabitChecksAction() {
    const db = client.db('habit_tracker');
    const habitChecksDb = db.collection('habitChecks');
    const habitChecks = await habitChecksDb.find().toArray()

    return new Promise((resolve, reject) => {
        if (habitChecks) {
            const habitMap : HabitCheck[] = habitChecks.map((check) => {
                return {
                    date: check.date,
                    habit_id: check.habit_id,
                    notes: check.notes
                }
            })
            resolve(JSON.stringify({ status: 200, data: habitMap }))
        } else {
            reject(new Error("Cannot fetch habit checks."))
        }
    })
}

