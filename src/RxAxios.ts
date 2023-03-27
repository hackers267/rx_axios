import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  catchError,
  from,
  map,
  type Observable,
  type ObservedValueOf,
} from "rxjs";

type ObservableAxiosResponse<T> = Observable<
  ObservedValueOf<Promise<AxiosResponse<T>>>
>;

interface CustomConfig {
  getResponse?: boolean;
}

export type RequestConfig<T> = Omit<
  AxiosRequestConfig<T> & CustomConfig,
  "url" | "method"
>;
export type GetRequestConfig<T> = RequestConfig<T>;
export type PostRequestConfig<T> = RequestConfig<T>;
export type DeleteRequestConfig<T> = RequestConfig<T>;
export type PutRequestConfig<T> = RequestConfig<T>;

type ReqInterceptorFun =
  | ((
      value: InternalAxiosRequestConfig<any>
    ) =>
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>>)
  | null
  | undefined;

type ResInterceptorFun =
  | ((
      value: AxiosResponse<any, any>
    ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
  | null
  | undefined;

type ReqRejected = ((error: any) => any) | null | undefined;

type ResRejected = ((error: any) => any) | null | undefined;

/**
 * Axios的RxJs包装器
 * @public
 */
class RxAxios {
  /**
   * 内部的axios
   */
  private readonly axios: AxiosInstance;

  /**
   * 创建一个RxAxios实例
   * @param config - (可选)axios配置
   */
  private constructor(config?: CreateAxiosDefaults) {
    this.axios = axios.create(config);
  }

  /**
   * 创建一个RxAxios实例
   * @param config - (可选),axios配置
   * @public
   */
  static of(config?: CreateAxiosDefaults): RxAxios {
    return new RxAxios(config);
  }

  /**
   * 添加请求拦截器
   * @public
   * @param fulfilled - 拦截器正常处理函数
   * @param rejected - 拦截器错误处理函数
   */
  requestInterceptor(
    fulfilled?: ReqInterceptorFun,
    rejected?: ReqRejected
  ): void {
    this.axios.interceptors.request.use(fulfilled, rejected);
  }

  /**
   * 添加响应拦截器
   * @public
   * @param fulfilled - 拦截器正常处理函数
   * @param rejected - 拦截器错误处理函数
   */
  responseInterceptor(
    fulfilled?: ResInterceptorFun,
    rejected?: ResRejected
  ): void {
    this.axios.interceptors.response.use(fulfilled, rejected);
  }

  /**
   * Get请求
   * @public
   * @param url - 请求地址
   * @param config - (可选)请求配置
   */
  get<T = any>(
    url: string,
    config: GetRequestConfig<any> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse, ...rest } = config;
    const length = Object.keys(rest).length;
    const request =
      length > 0 ? this.axios.get(url, rest) : this.axios.get(url);
    return from(request).pipe(
      map((res) => (getResponse === true ? res : res.data)),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  /**
   * Post请求
   * @public
   * @param url - 请求地址
   * @param data - (可选)请求体数据
   * @param config - (可选)请求配置
   */

  post<T = any>(
    url: string,
    data?: any,
    config: PostRequestConfig<any> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse, ...rest } = config;
    const length = Object.keys(rest).length;
    const request =
      length > 0
        ? this.axios.post(url, data, rest)
        : this.axios.post(url, data);
    return from(request).pipe(
      map((res) => (getResponse === true ? res : res.data))
    );
  }

  /**
   * Delete请求
   * @param url - 请求地址
   * @param config - (可选)请求配置
   */
  delete<T = any>(
    url: string,
    config: DeleteRequestConfig<T> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(this.axios.delete(url, config)).pipe(
      map((res) => (getResponse === true ? res : res.data))
    );
  }

  /**
   * PUT请求
   * @param url - 请求地址
   * @param data - (可选)请求数据
   * @param config - (可选)请求配置
   */
  put<T = any>(
    url: string,
    data?: any,
    config: PutRequestConfig<T> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(this.axios.put(url, data, config)).pipe(
      map((res) => (getResponse === true ? res : res.data))
    );
  }
}

export default RxAxios;
