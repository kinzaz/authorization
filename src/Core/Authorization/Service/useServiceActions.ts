import { ServiceApi } from "../../Service";
import { useAuthorizationStore } from "../Store/Hooks";

/**
 * Model of auth user data.
 *
 * @property login Login of user.
 * @property password Password of user.
 */
export interface IUserAuthData {
  login: string;
  password: string;
}

/** Model of service actions of auth module. */
interface IServiceActions {
  /**
   * Action login of user.
   *
   * @param authData Auth data.
   */
  login(authData: IUserAuthData): void;
}

/** Base path to authorization rest. */
const AUTH_PATH = "/auth";

/** Service actions of auth module. */
export const useServiceAction = (): IServiceActions => {
  const store = useAuthorizationStore();

  /** @inheritDoc */
  const login = (authData: IUserAuthData): void => {
    ServiceApi.POST(`${AUTH_PATH}/login`, authData, {
      withCredentials: true,
    }).then(
      () => {
        store.setIsAuthenticated(true);
      },
      () => {
        // event bus
      }
    );
  };

  return { login };
};
