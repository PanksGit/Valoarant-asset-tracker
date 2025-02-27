// Conversion rate: 1 VP = 0.01 USD
export const VP_TO_USD_RATE = 0.01;

export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "BRL" | "PHP" | "KRW" | "JPY" | "CAD" | "TRY";

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  BRL: "R$",
  PHP: "₱",
  KRW: "₩",
  JPY: "¥",
  CAD: "CA$",
  TRY: "₺"
};

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  USD: 1.00,    // Base currency
  EUR: 0.92,    // Euro
  GBP: 0.79,    // British Pound
  INR: 82.86,   // Indian Rupee
  BRL: 4.97,    // Brazilian Real
  PHP: 55.85,   // Philippine Peso
  KRW: 1330.23, // South Korean Won
  JPY: 150.37,  // Japanese Yen
  CAD: 1.35,    // Canadian Dollar
  TRY: 31.24    // Turkish Lira
};

export function convertVPToCurrency(vp: number, currency: CurrencyCode): string {
  const usdAmount = vp * VP_TO_USD_RATE;
  const convertedAmount = usdAmount * CURRENCY_RATES[currency];

  // Format based on currency
  let formattedAmount = convertedAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Special formatting for currencies that typically don't use decimals
  if (["KRW", "JPY"].includes(currency)) {
    formattedAmount = Math.round(convertedAmount).toLocaleString();
  }

  return `${CURRENCY_SYMBOLS[currency]}${formattedAmount}`;
}