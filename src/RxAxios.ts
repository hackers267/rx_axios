import axios from "axios";
import { from } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class RxAxios {
  get(url: string): any {
    return from(axios.get(url));
  }

  post(url: string): any {
    return from(axios.post(url));
  }
}

const rxAxios = new RxAxios();

export { rxAxios };

export default RxAxios;
