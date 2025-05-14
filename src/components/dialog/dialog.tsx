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
  return <dialog open={open}>{open && children}</dialog>;
}
