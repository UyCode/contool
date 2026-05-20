export function convertBigInt(value, fromBase, toBase) {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = 0n;
  for (const char of value.toLowerCase()) {
    const digitValue = digits.indexOf(char);
    if (digitValue < 0 || digitValue >= fromBase) {
      throw new Error(`Invalid digit '${char}' for base ${fromBase}`);
    }
    const digit = BigInt(digitValue);
    result = result * BigInt(fromBase) + digit;
  }
  return result.toString(toBase);
}
