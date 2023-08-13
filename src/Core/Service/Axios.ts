import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { restPath } from "./Consts";
import { stores } from "Store";
import { IAuthorization } from "Core/Authorization/Store";
import { router } from "Router";
import { ROUTE_NAMES } from "Router/Consts";

/** Path Service auth. */
const AUTH_SERVICE = `${restPath}/auth`;

/** Axios instance with default headers. */
const Axios = axios.create({
  headers: {
    origin: restPath,
    Host: restPath.replace("//", "/").replace("/", ""),
  },
});

/**
 * Singlton with private access token storage in closure.
 * @access STOP EXPORT FUNCTION.
 */
function PrivateTokenModule() {
  let accessToken = "";

  /** Setter access token */
  // @ts-ignore
  this.setToken = (newAccessToken: string) => {
    accessToken = newAccessToken;
  };

  /** Setter access token to request headers. */
  // @ts-ignore
  this.applyToken = (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };
}

/**
 * Closure private function.
 */
// @ts-ignore
const TokenModule = new PrivateTokenModule();

/** Update access token rest. */
const refreshAccessToken = (): Promise<
  AxiosResponse<{ accessToken: string }>
> => Axios.post(`${AUTH_SERVICE}/refresh`, {}, { withCredentials: true });

/** Save token to private function and delete it from response. */
Axios.interceptors.response.use(
  (response) => {
    if (
      response.config.url?.includes(`${AUTH_SERVICE}/login`) &&
      response.status === 200
    ) {
      TokenModule.setToken(response.data.accessToken);
      return {
        ...response,
        data: { "Axios.interceptor": "access token has been deleted" },
      };
    }
    return response;
  },
  (error) => {
    // event bus
  }
);

/** Set access token in all requests. */
Axios.interceptors.request.use(TokenModule.applyToken, (error) =>
  Promise.reject(error)
);

/** Auth checker. */
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { errorCd } = error.response.data;

      if (errorCd === "ACCESS_EXPIRED") {
        await refreshAccessToken();
        // repeat request
        return Axios(originalRequest);
      }
      if (errorCd === "UNAUTHORIZED" || errorCd === "REFRESH_EXPIRED") {
        (stores.authorization as IAuthorization).setIsAuthenticated(false);
        router.navigate(ROUTE_NAMES.AUTHORIZATION.PATH);
        return;
      }
    }
    return Promise.reject(error);
  }
);

export const AxiosInstance = Axios;
