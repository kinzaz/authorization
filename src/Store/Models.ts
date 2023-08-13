import { IAuthorizationStore } from "Core/Authorization/Store/Models";

/**
 * Root model of store.
 * @property authorizationStore Store of authorization.
 */
export interface IRootStore {
  authorizationStore: IAuthorizationStore;
}

/**
 * Model of app state.
 *
 * @property authorization Store of authorization.
 */
export interface IStore {
  authorization: IAuthorizationStore;
}

/** Type combining default and operational status. */
export type TRootStore = IStore;
