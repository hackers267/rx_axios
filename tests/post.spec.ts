import { post } from "@src/index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("RxAxios POST", () => {
  test("simple", (done) => {
    mockedAxios.post.mockResolvedValue({ success: true });
    post("/api/v1").subscribe({
      next(v: any) {
        expect(v).toEqual({ success: true });
        done();
      },
    });
  });
});
