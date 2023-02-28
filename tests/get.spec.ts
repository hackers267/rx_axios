import axios from "axios";
import { get } from "../src";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("RxAxios Get", () => {
  test("Simple", (done) => {
    mockedAxios.get.mockResolvedValue({ success: true });
    get("api/hi").subscribe((x: any) => {
      expect(x).toEqual({ success: true });
      done();
    });
  });
});
