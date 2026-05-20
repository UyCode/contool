export function detectBase(value) {
  const normalized = value.toLowerCase().replace(/^[+-]/, "");
  if (normalized.startsWith("0b")) return 2;
  if (normalized.startsWith("0o")) return 8;
  if (normalized.startsWith("0x")) return 16;
  if (/^[0-9]+$/.test(normalized)) return 10;
  return 16;
}
