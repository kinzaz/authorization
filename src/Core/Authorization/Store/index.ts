import { makeAutoObservable } from "mobx";

/** Model of authorization store. */
export interface IAuthorization {
  /** Flag that the user is authenticated. */
  isAuthenticated: boolean;

  /**
   * Setter for isAuthenticated property.
   *
   * @param value Value of auth flag isAuthenticated.
   */
  setIsAuthenticated(value: boolean): void;
}

/**
 * Auth store.
 * @inheritDoc
 */
export class AuthorizationStore implements IAuthorization {
  /** @inheritDoc */
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /** @inheritDoc */
  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}
