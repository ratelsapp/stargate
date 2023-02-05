import sessionReducer from "./session/reducer";
import AuthReducer from "./wallet/reducer";
import Snackbar from "./snackbar/reducer";

export { sessionReducer };

export default {
  wallet: AuthReducer,
  snackbar: Snackbar,
};
