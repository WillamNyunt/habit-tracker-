"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./modal.module.css";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  return (
    <>
      {modal && (
        <div className={classes.backdrop}>
          <dialog open className={classes.modal}>
            <div className="bg-white m-auto p-8">
              <div className="flex flex-col items-center">
                <h3>Add habits</h3>
                <br />
                <Link href={pathname}>
                  <button type="button" className="bg-red-500 text-white p-2">
                    Close Modal
                  </button>
                </Link>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default Modal;
