import { describe, it, expect } from "vitest";

import resources from "../resources";

  describe("range", () => {
    it("load images as resources", () => {
    expect(resources(
        "/src/assets/img/lemon.png",
      "/src/assets/img/orange.png"
    )).toBeTruthy();
    });
  });