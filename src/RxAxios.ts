import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
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

export type GetRequestConfig<T> = Omit<
  AxiosRequestConfig<T> & CustomConfig,
  "url" | "method"
>;
export type PostRequestConfig<T> = Omit<
  AxiosRequestConfig<T> & CustomConfig,
  "url" | "method"
>;

/**
 * Axios的RxJs包装器
 * @public
 */
class RxAxios {
  /**
   * 内部的axios
   * @private
   */
  private readonly axios: AxiosInstance;

  /**
   * 创建一个RxAxios实例
   * @param config - (可选)axios配置
   * @private
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
   * Get请求
   * @public
   * @param url - 请求地址
   * @param config - (可选)请求配置
   */
  get<T = any>(
    url: string,
    config: GetRequestConfig<any> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(this.axios.get(url, config)).pipe(
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
    const { getResponse } = config;
    return from(this.axios.post(url, data, config)).pipe(
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
    config: GetRequestConfig<T> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(this.axios.delete(url, config)).pipe(
      map((res) => (getResponse === true ? res : res.data))
    );
  }
}

export default RxAxios;
