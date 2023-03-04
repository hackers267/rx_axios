import axios from "axios";
import RxAxios from "@src/RxAxios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);
describe("RxAxios DELETE", () => {
  const mockData = { data: { success: true } };
  mockedAxios.create.mockReturnValue(axios);
  mockedAxios.delete.mockResolvedValue(mockData);
  const rxAxios = RxAxios.of();
  test("delete without getResponse", (done) => {
    rxAxios.delete("/api/v1").subscribe((v) => {
      expect(v).toEqual(mockData.data);
      done();
    });
  });
  test("delete with getResponse", (done) => {
    rxAxios.delete("/api/v1", { getResponse: true }).subscribe((v) => {
      expect(v).toEqual(mockData);
      done();
    });
  });
});
