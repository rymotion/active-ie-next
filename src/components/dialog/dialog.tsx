import { Modal } from "../modal/modal";

export default function ACTVDialog({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  console.log(setOpen);
  return <Modal isOpen={open} children={children} onClose={() => {}}></Modal>;
}
