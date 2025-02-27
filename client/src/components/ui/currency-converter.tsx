import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CURRENCY_RATES, CURRENCY_SYMBOLS, convertVPToCurrency, type CurrencyCode } from "@/lib/currency";

interface CurrencyConverterProps {
  vpAmount: number;
}

export function CurrencyConverter({ vpAmount }: CurrencyConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Select
          value={selectedCurrency}
          onValueChange={(value) => setSelectedCurrency(value as CurrencyCode)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((currency) => (
              <SelectItem key={currency} value={currency}>
                {CURRENCY_SYMBOLS[currency]} {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-lg font-semibold">
          {convertVPToCurrency(vpAmount, selectedCurrency)}
        </div>
      </div>
    </div>
  );
}