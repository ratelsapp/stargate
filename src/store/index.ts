import { configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import allReducer, { sessionReducer } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AuthState } from "./wallet/states";
import { SessionState } from "./session/states";
import { SnackbarState } from "./snackbar/states";

import { PersistState } from "redux-persist/es/types";

interface PersistPartial {
  _persist: PersistState;
}

export interface AllState {
  wallet: AuthState;
  session: SessionState & PersistPartial;
  cache: any;
  snackbar: SnackbarState;
}

const defaultStorageConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
  version: 0,
};

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["cache", "session", "global", "loading", "snackbar"],
  version: 1,
};

const SessionPersistConfig = {
  key: "session",
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
  version: 3,
};

const rootReducer = combineReducers({
  ...allReducer,
  session: persistReducer<SessionState, AnyAction>(SessionPersistConfig, sessionReducer),
});

const PersistReducer = persistReducer<AllState, AnyAction>(
  rootPersistConfig,
  // @ts-ignore
  rootReducer
);

const store = configureStore({
  reducer: PersistReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true, serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
