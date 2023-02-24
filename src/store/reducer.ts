import sessionReducer from "./session/reducer";
import AuthReducer from "./wallet/reducer";
import Snackbar from "./snackbar/reducer";
import global from "./global/reducer";

export { sessionReducer };

export default {
  wallet: AuthReducer,
  snackbar: Snackbar,
  global: global,
};
