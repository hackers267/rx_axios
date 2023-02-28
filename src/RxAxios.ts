import axios, { type AxiosResponse } from "axios";
import { from, type Observable, type ObservedValueOf } from "rxjs";

type ObservableAxiosResponse<T> = Observable<
  ObservedValueOf<Promise<AxiosResponse<T>>>
>;

class RxAxios {
  get<T = any>(url: string): ObservableAxiosResponse<T> {
    return from(axios.get(url));
  }

  post<T = any>(url: string): ObservableAxiosResponse<T> {
    return from(axios.post(url));
  }
}

const rxAxios = new RxAxios();

export { rxAxios };

export default RxAxios;
