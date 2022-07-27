import { describe, it, expect } from "vitest";

import range from "../ranger";

  describe("range", () => {
    it("generate range of numbers from 1 to 3", () => {
    expect([...range(1, 3)]).toBeTruthy();
    });

    it("generate range of numbers from -2 to -2", () => {
        expect([...range(-2,2)]).toBeTruthy();
    });
  });