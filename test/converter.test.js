import { describe,it,expect } from "vitest";
import { convert } from "../src/converter.js";

describe("convert",()=>{
  // Basic conversions
  it("decimal to binary",()=>expect(convert("5",2)).toBe("101"));
  it("binary to decimal",()=>expect(convert("101",10)).toBe("5"));
  it("hex to decimal",()=>expect(convert("0xff",10)).toBe("255"));
  it("decimal to hex",()=>expect(convert("255",16,10)).toBe("ff"));
  it("binary to hex",()=>expect(convert("11111111",16)).toBe("ff"));
  it("octal to decimal",()=>expect(convert("377",10)).toBe("255"));
  it("decimal to octal",()=>expect(convert("255",8,10)).toBe("377"));

  // Negative numbers (32-bit two's complement)
  it("negative decimal to binary",()=>expect(convert("-1",2)).toBe("11111111111111111111111111111111"));
  it("negative decimal to hex",()=>expect(convert("-1",16)).toBe("ffffffff"));
  it("negative decimal to octal",()=>expect(convert("-1",8)).toBe("37777777777"));
  it("negative to decimal",()=>expect(convert("-255",10)).toBe("-255"));

  // Fractions
  it("fraction to binary",()=>expect(convert("0.5",2)).toBe("0.1"));
  it("fraction to hex",()=>expect(convert("0.5",16)).toBe("0.8"));

  // Auto-detection
  it("auto-detect binary",()=>expect(convert("101",10)).toBe("5"));
  it("auto-detect octal",()=>expect(convert("77",10)).toBe("63"));
  it("auto-detect hex",()=>expect(convert("ff",10)).toBe("255"));

  // With prefixes
  it("prefixed binary",()=>expect(convert("0b101",10)).toBe("5"));
  it("prefixed octal",()=>expect(convert("0o77",10)).toBe("63"));
  it("prefixed hex",()=>expect(convert("0xff",10)).toBe("255"));

  // Large numbers (BigInt)
  it("large number to binary",()=>expect(convert("9007199254740991",2)).toBe("11111111111111111111111111111111111111111111111111111"));
});