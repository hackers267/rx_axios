import { sum } from "../src";

describe("sum", function () {
  test("should be right", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
