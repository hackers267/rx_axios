import { post } from "@src/index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios POST with success", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  mockedAxios.post.mockResolvedValue(mockData);
  test("simple", (done) => {
    post("/api/v1").subscribe({
      next(v: any) {
        expect(v).toEqual(mockData.data);
        done();
      },
    });
  });
  test("with getResponse", (done) => {
    post("/api/v1", {}, { getResponse: true }).subscribe({
      next(v: any) {
        expect(v).toEqual(mockData);
        done();
      },
    });
  });
});
