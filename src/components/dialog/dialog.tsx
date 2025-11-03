import { Modal } from "../modal/modal";

export default function ACTVDialog({
  open,
  children,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Modal isOpen={open} onClose={() => {}}>
      {children}
    </Modal>
  );
}
