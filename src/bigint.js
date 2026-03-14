export function convertBigInt(value, fromBase, toBase) {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = 0n;
  for (const char of value.toLowerCase()) {
    const digit = BigInt(digits.indexOf(char));
    result = result * BigInt(fromBase) + digit;
  }
  return result.toString(toBase);
}