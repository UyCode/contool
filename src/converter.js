import { detectBase } from "./detectBase.js";
import { convertBigInt } from "./bigint.js";
import { convertFraction } from "./fraction.js";

export function convert(value, toBase, fromBase) {
  if (value.startsWith('-')) {
    const num = BigInt(value);
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
  const base = fromBase || detectBase(value);
  if (value.includes(".")) return convertFraction(parseFloat(value), toBase);
  const clean = value.replace(/^0[xob]/,"");
  return convertBigInt(clean, base, toBase);
}