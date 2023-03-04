import axios from "axios";
import { RxAxios } from "@src/index";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios PUT with success", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  mockedAxios.create.mockReturnValue(axios);
  mockedAxios.put.mockResolvedValue(mockData);
  const rxAxios = RxAxios.of();
  test("simple", (done) => {
    rxAxios.put("/api/v1").subscribe({
      next(v: any) {
        expect(v).toEqual(mockData.data);
        done();
      },
    });
  });
  test("with getResponse", (done) => {
    rxAxios.put("/api/v1", {}, { getResponse: true }).subscribe({
      next(v: any) {
        expect(v).toEqual(mockData);
        done();
      },
    });
  });
});

describe("RxAxios PUT with config", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  mockedAxios.create.mockReturnValue(axios);
  mockedAxios.put.mockResolvedValue(mockData);
  const rxAxios = RxAxios.of();
  test("with baseUrl", () => {
    rxAxios.put("/v1", {}, { baseURL: "/api" }).subscribe((v) => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "/v1",
        {},
        { baseURL: "/api" }
      );
    });
  });
});
