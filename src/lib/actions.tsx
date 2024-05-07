'use server'

export async function addHabit(prevState : {message : string}, formData : FormData) {
    const data = {
        name: formData.get('name')
    
    }
    
    console.log(data)
    
    await (
        new Promise((resolve) => setTimeout(resolve, 2000))
    )
    return {
        message: `Habit ${data.name} added!`
    }
}
