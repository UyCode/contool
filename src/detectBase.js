export function detectBase(value) {
  if (value.startsWith("0b")) return 2;
  if (value.startsWith("0o")) return 8;
  if (value.startsWith("0x")) return 16;
  if (/^[01]+$/.test(value)) return 2;
  if (/^[0-7]+$/.test(value)) return 8;
  if (/^[0-9]+$/.test(value)) return 10;
  return 16;
}