'use client';

import { deleteHabitByIdAction } from '@/lib/actions';


interface HabitsDeleteBtnProps {
    id: string;
}

export default function HabitsDeleteBtn(props: HabitsDeleteBtnProps) {
    async function handleDelete() {
        await deleteHabitByIdAction(props.id);
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    );
}