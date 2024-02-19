import { NormalArea } from "../Flyer/schema";
import { layout } from "../data/template";
import { retrieveKeys } from "./retrieveKeys";

import { describe, expect, test } from "vitest";

describe("retrieveKeys", () => {
  test("retrieveKeys", () => {
    expect(retrieveKeys((layout.areas[3] as NormalArea).template)).toEqual([
      "title",
      "subtitle",
    ]);
  });

  test("retrieveKeys", () => {
    expect(retrieveKeys((layout.areas[4] as NormalArea).template)).toEqual([
      "title",
      "subtitle",
      "catchCopy",
    ]);
  });

  test("retrieveKeys", () => {
    expect(retrieveKeys((layout.areas[5] as NormalArea).template)).toEqual([
      "subtitle",
      ["link", ["site", "url"]],
      "catchCopy",
    ]);
  });
});
