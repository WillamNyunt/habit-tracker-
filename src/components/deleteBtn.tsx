'use client';


interface DeleteBtnProps {
    id: string;
    deleteFn: (id: string) => Promise<{ message: string | null }>;
}


/**
 * This component is a button that deletes an item. You can pass the id of the item and the function to delete the item as props.
 * @param {string} id id of the item to be delete
 * @param {Function} deleteFn  function to delete the item
 * @returns {Promise <{ message: string | null }>} returns either message or null
 */
export default function DeleteBtn(props: DeleteBtnProps) {
    async function handleDelete() {
        await props.deleteFn(props.id);
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    );
}