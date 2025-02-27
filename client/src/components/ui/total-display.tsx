import { Card, CardContent } from "@/components/ui/card";
import { CurrencyConverter } from "@/components/ui/currency-converter";

interface TotalDisplayProps {
  total: number;
}

export function TotalDisplay({ total }: TotalDisplayProps) {
  return (
    <Card className="fixed bottom-4 right-4 left-4 sm:left-auto bg-primary text-primary-foreground max-w-sm z-50">
      <CardContent className="p-4 sm:p-6">
        <div className="text-lg font-semibold">Total Cost</div>
        <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
          {total.toLocaleString()} VP
        </div>
        <CurrencyConverter vpAmount={total} />
      </CardContent>
    </Card>
  );
}