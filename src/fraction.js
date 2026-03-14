export function convertFraction(num, base, precision = 12) {
  const integer = Math.floor(num);
  let fraction = num - integer;
  let out = integer.toString(base);
  if (!fraction) return out;
  out += ".";
  for (let i = 0; i < precision; i++) {
    fraction *= base;
    const digit = Math.floor(fraction);
    out += digit.toString(base);
    fraction -= digit;
    if (!fraction) break;
  }
  return out;
}