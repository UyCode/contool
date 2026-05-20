import { detectBase } from "./detectBase.js";
import { convertBigInt } from "./bigint.js";
import { convertFraction } from "./fraction.js";

export function convert(value, toBase, fromBase) {
  const input = value.trim();
  if (input.startsWith("-")) {
    const base = fromBase || detectBase(input);
    const num = -parseInteger(input.slice(1), base);
    if (toBase === 2 || toBase === 8 || toBase === 16) {
      // Two's complement, assume 32 bits
      const bits = 32;
      const mask = (1n << BigInt(bits)) - 1n;
      const unsigned = num & mask;
      return unsigned.toString(toBase).padStart(toBase === 2 ? bits : 0, '0');
    } else {
      return num.toString(toBase);
    }
  }
  const base = fromBase || detectBase(input);
  if (input.includes(".")) return convertFraction(parseFloat(input), toBase);
  const clean = stripBasePrefix(input);
  return convertBigInt(clean, base, toBase);
}

function parseInteger(value, base) {
  return BigInt(convertBigInt(stripBasePrefix(value), base, 10));
}

function stripBasePrefix(value) {
  return value.replace(/^0[xob]/i, "");
}
