import axios from "axios";
import { RxAxios } from "@src/index";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("RxAxios Get with success", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  mockedAxios.create.mockReturnValue(axios);
  mockedAxios.get.mockResolvedValue(mockData);
  test("Simple", (done) => {
    const rxAxios = RxAxios.of({});
    rxAxios.get("/api/v1").subscribe((x) => {
      expect(x).toEqual(mockData.data);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/v1");
      done();
    });
  });

  test("with getResponse", (done) => {
    const rxAxios = RxAxios.of({});
    rxAxios.get("/api/v1", { getResponse: true }).subscribe((x) => {
      expect(x).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/v1");
      done();
    });
  });
});
describe("RxAxios Get with Error", () => {
  beforeAll(() => {
    mockedAxios.create.mockReturnValue(axios);
    mockedAxios.get.mockRejectedValue("error");
  });
  const rxAxios = RxAxios.of();
  test("with error", (done) => {
    rxAxios.get("/api/v1").subscribe({
      error(e) {
        expect(e.message).toEqual("error");
        expect(mockedAxios.get).toHaveBeenCalledWith("/api/v1");
        done();
      },
    });
  });
});

describe("RxAxios Get with config", () => {
  beforeAll(() => {
    const mockData: { data: { success: boolean } } = {
      data: { success: true },
    };
    mockedAxios.create.mockReturnValue(axios);
    mockedAxios.get.mockResolvedValue(mockData);
  });
  const rxAxios = RxAxios.of();
  test("with baseUrl", (done) => {
    rxAxios.get("/v1", { baseURL: "/api" }).subscribe((v) => {
      expect(mockedAxios.get).toHaveBeenCalledWith("/v1", {
        baseURL: "/api",
      });
      done();
    });
  });
});
