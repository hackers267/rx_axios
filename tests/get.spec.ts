import axios from "axios";
import { get } from "@src/index";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("RxAxios Get", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  test("Simple", (done) => {
    mockedAxios.get.mockResolvedValue(mockData);
    get("api/v1").subscribe((x) => {
      expect(x).toEqual(mockData.data);
      done();
    });
  });

  test("with getResponse", (done) => {
    mockedAxios.get.mockResolvedValue(mockData);
    get("/api/v1", { getResponse: true }).subscribe((x) => {
      expect(x).toEqual(mockData);
      done();
    });
  });

  test("with error", (done) => {
    mockedAxios.get.mockRejectedValue("error");
    get("/api/v1").subscribe({
      error(e) {
        expect(e.message).toEqual("error");
        done();
      },
    });
  });
});
