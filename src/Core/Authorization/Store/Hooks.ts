import { useContext } from "react";
import { IAuthorization } from "./index";
import { TRootStore } from "Store/Models";
import { RootStoreContext } from "Store";

/** Hook to access the auth store. */
export const useAuthorizationStore = (): IAuthorization =>
  useContext<TRootStore>(RootStoreContext).authorization as IAuthorization;
