export function isTestMode() {
  if (typeof process === "undefined") return false;
  const value = process.env.NEXT_PUBLIC_TEST_MODE || process.env.TEST_MODE;
  return value === "true" || value === "1";
}
