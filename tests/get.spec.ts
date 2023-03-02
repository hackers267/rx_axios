import axios from "axios";
import { get } from "@src/index";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("RxAxios Get", () => {
  test("Simple", (done) => {
    mockedAxios.get.mockResolvedValue({ success: true });
    get("api/v1").subscribe((x) => {
      expect(x).toEqual({ success: true });
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
