/** Locale-aware price formatting, e.g. formatPrice("12.0", "USD", "es") → "12,00 US$". */
export function formatPrice(
  amount: string | number,
  currencyCode: string,
  locale: string = "en"
): string {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode || "USD",
  }).format(value);
}
