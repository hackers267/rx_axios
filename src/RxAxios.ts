import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { catchError, from, type Observable, type ObservedValueOf } from "rxjs";

type ObservableAxiosResponse<T> = Observable<
  ObservedValueOf<Promise<AxiosResponse<T>>>
>;

export type GetRequestConfig<T> = Omit<AxiosRequestConfig<T>, "url" | "method">;
export type PostRequestConfig<T> = Omit<
  AxiosRequestConfig<T>,
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
    config?: GetRequestConfig<any>
  ): ObservableAxiosResponse<T> {
    return from(axios.get(url, config)).pipe(
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
    config?: PostRequestConfig<any>
  ): ObservableAxiosResponse<T> {
    return from(axios.post(url, data, config));
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
