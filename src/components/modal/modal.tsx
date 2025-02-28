"useClient";
import { useEffect } from "react";
import style from "./modal.module.css";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={style.modalBackdrop}>
        <div className={style.modalContent}>
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      </div>
    </>
  );
};
