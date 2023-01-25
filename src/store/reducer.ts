import sessionReducer from "./session/reducer";
import AuthReducer from "./wallet/reducer";

export { sessionReducer };

export default {
  wallet: AuthReducer,
};
