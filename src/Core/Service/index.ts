import { AxiosInstance } from "./Axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { restPath } from "./Consts";

/** Type of primitive params in url-query. */
type TParamPrimitive = string | number | boolean | null;

/** Typification of Params query.  */
interface TParams {
  [p: string]: TParamPrimitive | Array<string | number>;
}

/**
 * Advanced url parameter.
 *
 * @property url String of url.
 * @property params Object transforms to url query.
 */
interface IQueryObject<Params = unknown> {
  url: string;
  params: Params extends unknown ? TParams : Params;
}

/**
 * Type guard for whether it is an extended version url.
 *
 * @param url url.
 */
function isParamUrl(url: string | IQueryObject): url is IQueryObject {
  return typeof url !== "string";
}

/** Class-adapter for API axios. */
export class ServiceApi {
  /** Axios instance. */
  private static axiosInsance = AxiosInstance;

  /**
   * Method - get request.
   *
   * @param url Url path.
   * @param [params] Parameters of request.
   */
  public static GET<TResponse>(
    url: string,
    params?: TParams
  ): Promise<AxiosResponse<TResponse>> {
    return ServiceApi.axiosInsance.get<TResponse>(
      `${restPath}${url}${this.convertObjectToQueryString({ ...params })}`
    );
  }

  /**
   * Method - post request.
   *
   * @param url string or parameters object url.
   * @param data Body request.
   * @param config Config request.
   */
  public static POST<TResponse, TData = unknown, QueryObject = null>(
    url: QueryObject extends null ? string : IQueryObject<QueryObject>,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    const requestUrl = isParamUrl(url)
      ? url.url + this.convertObjectToQueryString(url.params)
      : url;
    return ServiceApi.axiosInsance.post<TResponse>(
      restPath + requestUrl,
      data,
      config
    );
  }

  /** Method transforms object to parameter string for request.
   * @example @ignore {param: 'test', value: 42, flag: false} -> "?param=test&value=42&flag=false".
   *
   * @param [params] Parameters of request.
   */
  public static convertObjectToQueryString<P = TParams>(params?: P): string {
    if (!params) return "";

    return Object.keys(params)
      .reduce((urlParams: string, key: string) => {
        // @ts-ignore
        const param = params[key];
        if (param === undefined || param === "") return urlParams;

        return `${urlParams}${key}=${encodeURIComponent(
          Array.isArray(param) ? param.join(",") : String(param)
        )}&`;
      }, "?")
      .slice(0, -1);
  }
}
