import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/index";
import RedirectIndex from "./pages/RedirectIndex";

export default createBrowserRouter([
  {
    path: "/user/:principal",
    element: <Index />,
  },
  {
    path: "/",
    element: <RedirectIndex />,
  },
]);
