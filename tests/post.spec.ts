import axios from "axios";
import { RxAxios } from "@src/index";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios POST with success", () => {
  const mockData: { data: { success: boolean } } = { data: { success: true } };
  mockedAxios.create.mockReturnValue(axios);
  mockedAxios.post.mockResolvedValue(mockData);
  const rxAxios = RxAxios.of();
  test("simple", (done) => {
    rxAxios.post("/api/v1").subscribe({
      next(v: any) {
        expect(v).toEqual(mockData.data);
        done();
      },
    });
  });
  test("with getResponse", (done) => {
    rxAxios.post("/api/v1", {}, { getResponse: true }).subscribe({
      next(v: any) {
        expect(v).toEqual(mockData);
        done();
      },
    });
  });
});
