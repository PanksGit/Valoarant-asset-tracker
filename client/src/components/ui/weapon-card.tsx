import { type Item } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeaponCardProps {
  item: Item;
  selected: boolean;
  onToggle: () => void;
}

export function WeaponCard({ item, selected, onToggle }: WeaponCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onToggle}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <Badge variant={selected ? "default" : "secondary"}>
            {item.rarity}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {item.cost.toLocaleString()} VP
        </p>
      </CardContent>
    </Card>
  );
}