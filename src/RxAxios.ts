import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { from, type Observable, type ObservedValueOf } from "rxjs";

type ObservableAxiosResponse<T> = Observable<
  ObservedValueOf<Promise<AxiosResponse<T>>>
>;

type GetRequestConfig<T> = Omit<AxiosRequestConfig<T>, "url" | "method">;
type PostRequestConfig<T> = Omit<AxiosRequestConfig<T>, "url" | "method">;

class RxAxios {
  get<T = any>(
    url: string,
    config?: GetRequestConfig<any>
  ): ObservableAxiosResponse<T> {
    return from(axios.get(url, config));
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: PostRequestConfig<any>
  ): ObservableAxiosResponse<T> {
    return from(axios.post(url, data, config));
  }
}

const rxAxios = new RxAxios();

const { get, post } = rxAxios;

export { rxAxios, get, post };

export default RxAxios;
