import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
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
   * Get请求
   * @public
   * @param url - 请求地址
   * @param config - 请求配置
   */
  get<T = any>(
    url: string,
    config: GetRequestConfig<any> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(axios.get(url, config)).pipe(
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
   * @param data - 请求体数据
   * @param config - 请求配置
   */

  post<T = any>(
    url: string,
    data?: any,
    config: PostRequestConfig<any> = { getResponse: false }
  ): ObservableAxiosResponse<T> {
    const { getResponse } = config;
    return from(axios.post(url, data, config)).pipe(
      map((res) => (getResponse === true ? res : res.data))
    );
  }
}

const rxAxios = new RxAxios();

/**
 * 独立的GET请求
 * @public
 */
const get = rxAxios.get;
/**
 * 独立的POST请求
 * @public
 */
const post = rxAxios.post;

export { rxAxios, get, post };

export default RxAxios;
