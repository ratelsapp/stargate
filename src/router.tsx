import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/index";

export default createBrowserRouter([
  {
    path: "/user/:principal",
    element: <Index />,
  },
]);
