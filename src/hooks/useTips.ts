import { useAppDispatch } from "store/hooks";
import { openSnackbar, closeSnackbar } from "store/snackbar/actions";
import { MessageTypes } from "types/tips";

export function useTips(): [(message: string, type: MessageTypes) => void, () => void] {
  const dispatch = useAppDispatch();

  const open = (message: string, type: MessageTypes) => {
    dispatch(openSnackbar({ message, type }));
  };

  const close = () => {
    dispatch(closeSnackbar());
  };

  return [open, close];
}
