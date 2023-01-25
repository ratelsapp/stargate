import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes";
import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App>
          <RouterProvider router={router} />
        </App>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
