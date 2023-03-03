import { post } from "@src/index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios POST", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  test("simple", (done) => {
    mockedAxios.post.mockResolvedValue(mockData);
    post("/api/v1").subscribe({
      next(v: any) {
        expect(v).toEqual(mockData.data);
        done();
      },
    });
  });
  test("with getResponse", (done) => {
    mockedAxios.post.mockResolvedValue(mockData);
    post("/api/v1", {}, { getResponse: true }).subscribe({
      next(v: any) {
        expect(v).toEqual(mockData);
        done();
      },
    });
  });
});
