import { configure } from "mobx";
import { IRootStore, IStore, TRootStore } from "./Models";
import { IAuthorizationStore } from "Core/Authorization/Store/Models";
import { AuthorizationStore } from "Core/Authorization/Store";
import { createContext } from "react";
import { defaultAuthorization } from "Core/Authorization/Store/Consts";

configure({
  enforceActions: "always",
  disableErrorBoundaries: process.env.NODE_ENV !== "development",
});

class RootStore implements IRootStore {
  /** @inheritDoc */
  authorizationStore: IAuthorizationStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore();
  }
}

/** Observable object of root store. */
const observableRootStore: IRootStore = new RootStore();

/** Observable object of stores, go to react context. */
export const stores: IStore = {
  authorization: observableRootStore.authorizationStore,
};

export const RootStoreContext = createContext<TRootStore>({
  authorization: defaultAuthorization,
});
