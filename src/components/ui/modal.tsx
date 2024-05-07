"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./modal.module.css";
import AddHabit from "../forms/AddHabit";

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
            <div className="bg-white m-auto p-8">
              <div className="flex flex-col items-center">
                {type === 'habit' && <AddHabit handleModalClose={closeModal} />}
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default Modal;
