import { FunctionComponent, useEffect, useState } from "react";
import { useAuthorizationStore } from "./Store/Hooks";
import { authRouter } from "./Router";
import { router } from "Router";
import { ROUTE_NAMES } from "Router/Consts";
import { RouterProvider } from "react-router-dom";
import { observer } from "mobx-react";

const { CONTENT, AUTHORIZATION } = ROUTE_NAMES;

export const AuthorizationProvider: FunctionComponent = observer(() => {
  const store = useAuthorizationStore();
  const [routerState, setRouterState] = useState(authRouter);

  useEffect(() => {
    setRouterState(store.isAuthenticated ? router : authRouter);

    setTimeout(() => {
      router.navigate(
        !store.isAuthenticated ? AUTHORIZATION.LOGIN.PATH : CONTENT.PATH
      );
    });
  }, [store.isAuthenticated]);

  return <RouterProvider router={routerState} />;
});
