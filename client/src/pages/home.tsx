import { useQuery } from "@tanstack/react-query";
import { type Item } from "@shared/schema";
import { CardGrid } from "@/components/ui/card-grid";
import { TotalDisplay } from "@/components/ui/total-display";
import { CategoryFilter } from "@/components/ui/category-filter";
import { useState } from "react";

interface CustomVP {
  id: number;
  amount: number;
}

export default function Home() {
  const [selectedType, setSelectedType] = useState<string>("Classic");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [customVPAmounts, setCustomVPAmounts] = useState<CustomVP[]>([]);
  const [nextCustomId, setNextCustomId] = useState(1);

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const toggleItem = (itemId: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleCustomVPAdd = (amount: number) => {
    setCustomVPAmounts(prev => [...prev, { id: nextCustomId, amount }]);
    setNextCustomId(prev => prev + 1);
  };

  const handleCustomVPRemove = (id: number) => {
    setCustomVPAmounts(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectAll = (type: string, shouldSelect: boolean) => {
    const typeItems = items?.filter(item => item.type === type && !item.isBaseSkin) || [];
    const newSelected = new Set(selectedItems);

    if (shouldSelect) {
      // Add all items of this type
      typeItems.forEach(item => newSelected.add(item.id));
    } else {
      // Remove all items of this type
      typeItems.forEach(item => newSelected.delete(item.id));
    }

    setSelectedItems(newSelected);
  };

  const handleDeselectAll = () => {
    setSelectedItems(new Set());
  };

  // Calculate total cost including both selected items and custom VP amounts
  const totalCost = 
    (items?.filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.cost, 0) || 0) +
    customVPAmounts.reduce((sum, custom) => sum + custom.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-28">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-4 sm:mb-8">
          Valorant Asset Calculator
        </h1>

        <CategoryFilter 
          selected={selectedType}
          onChange={setSelectedType}
          selectedItems={Array.from(selectedItems)}
          onCustomVPAdd={handleCustomVPAdd}
          onCustomVPRemove={handleCustomVPRemove}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          customVPAmounts={customVPAmounts}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-secondary animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          selectedType !== "Others" && (
            <div className="mt-4 mb-24 sm:mb-16">
              <CardGrid
                items={items?.filter(item => !item.isBaseSkin || item.type !== selectedType) || []}
                selectedItems={selectedItems}
                onToggleItem={toggleItem}
                type={selectedType}
              />
            </div>
          )
        )}

        <TotalDisplay total={totalCost} />
      </div>
    </div>
  );
}