import { RxAxios } from "@src/index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios request interceptor", () => {
  test("interceptor", () => {
    const mockedFn: (fn: any) => any = (fn: any) => {
      fn();
    };
    mockedAxios.interceptors.request.use = jest.fn(mockedFn);
    mockedAxios.create.mockReturnValue(axios);
    const rxAxios = RxAxios.of();
    const fn = jest.fn();
    rxAxios.requestInterceptor(fn);
    expect(fn).toHaveBeenCalled();
  });
});
