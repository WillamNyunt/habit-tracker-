import client from '@/lib/clientPromise';


export async function GET(req: Request) {
    const db = client.db('habit_tracker');
    const habits = db.collection('habits');
    const habitList = await habits.find().toArray();

    return {
        status: 200,
        body: habitList
    }
}