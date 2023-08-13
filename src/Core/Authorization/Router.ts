import { ROUTE_NAMES } from "Router/Consts";
import { createBrowserRouter } from "react-router-dom";
import { Authorization } from "./index";
import { ErrorBoundary } from "Common/Components/ErrorBoundary";
import { Login } from "./Pages/Login";

/** Config public router auth. */
export const authRouter = createBrowserRouter([
  {
    path: ROUTE_NAMES.PATH,
    Component: Authorization,
    ErrorBoundary,
    children: [
      {
        path: "*",
        Component: Login,
      },
      {
        index: true,
        Component: Login,
      },
      {
        path: ROUTE_NAMES.AUTHORIZATION.LOGIN.PATH,
        Component: Login,
      },
    ],
  },
]);
