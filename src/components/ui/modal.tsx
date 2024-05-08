"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import classes from "./modal.module.css";
import AddHabit from "../forms/AddHabit";
import EditHabitForm from "../forms/EditHabit";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const type = searchParams.get("type");
  const pathName = usePathname();
  const router = useRouter();

  function closeModal() {
    router.push(pathName);
  }

  return (
    <>
      {modal && (
        <div className={classes.backdrop}>
          <dialog open className={classes.modal}>
              <div className="flex flex-col items-center">
                {type === 'add-habit' && <AddHabit handleModalClose={closeModal} />}
                {type === 'edit-habit' && <EditHabitForm handleModalClose={closeModal} />}
              </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default Modal;
