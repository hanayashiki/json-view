import { describe, it, expect } from "vitest";

import { parseLooseJson } from "./parser";

describe("should parse JSON", () => {
  it("parse constant literal", () => {
    expect(parseLooseJson("1")).toBe(1);

    expect(parseLooseJson('"string"')).toBe("string");

    expect(parseLooseJson("'string'")).toBe("string");

    expect(parseLooseJson("true")).toBe(true);

    expect(parseLooseJson("false")).toBe(false);

    expect(parseLooseJson("null")).toBe(null);
  });

  it("parse exotic identifiers", () => {
    // Python
    expect(parseLooseJson("True")).toBe(true);
    expect(parseLooseJson("False")).toBe(false);
    expect(parseLooseJson("None")).toBe(null);
  });

  it("parse arrays", () => {
    expect(parseLooseJson("[]")).toMatchObject([]);

    expect(parseLooseJson("[1, 2, 3]")).toMatchObject([1, 2, 3]);

    expect(parseLooseJson("[1, 2, 3,]")).toMatchObject([1, 2, 3]);
  });

  it("parse objects", () => {
    expect(parseLooseJson("{}")).toMatchObject({});
    expect(
      parseLooseJson(`
        {
          "a": 1,
          "b": 2,
          "c": "c"
        }
      `)
    ).toMatchObject({
      a: 1,
      b: 2,
      c: "c",
    });
  });

  it("parse exotic objects", () => {
    expect(
      parseLooseJson(`
        {
          a: 1,
          'b': 2,
          3: 3,
          undefined: undefined
        }
      `)
    ).toMatchObject({
      a: 1,
      b: 2,
      3: 3,
    });
  });

  it("parse json with comments", () => {
    expect(
      parseLooseJson(`
        {
          // I am a comment
        }
      `)
    ).toMatchObject({});

    expect(
      parseLooseJson(`
        // I am a comment
        {}
      `)
    ).toMatchObject({});
  });
});
