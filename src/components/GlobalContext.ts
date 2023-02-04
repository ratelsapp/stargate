import { createContext } from "react";

export default createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: (open: boolean) => {},
});
