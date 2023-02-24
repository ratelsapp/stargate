import { createContext } from "react";

export type GlobalContext = {
  avatar: string;
  setAvatar: (avatar: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default createContext<GlobalContext>({} as GlobalContext);
