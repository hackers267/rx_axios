import { RxAxios } from "@src/index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios request interceptor", () => {
  test("interceptor", () => {
    const mockedFn: (fn: any) => any = (fn: any) => {
      fn();
    };
    mockedAxios.interceptors.response.use = jest.fn(mockedFn);
    mockedAxios.create.mockReturnValue(axios);
    const rxAxios = RxAxios.of();
    const fn = jest.fn();
    rxAxios.responseInterceptor(fn);
    expect(fn).toHaveBeenCalled();
  });
});
