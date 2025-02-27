import { type Item } from "@shared/schema";
import { WeaponCard } from "./weapon-card";
import { SearchBar } from "./search-bar";
import { useState } from "react";

interface CardGridProps {
  items: Item[];
  selectedItems: Set<number>;
  onToggleItem: (id: number) => void;
  type: string;
}

export function CardGrid({ items, selectedItems, onToggleItem, type }: CardGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item => {
    const matchesType = item.type === type;
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search skins by name..."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <WeaponCard
            key={item.id}
            item={item}
            selected={selectedItems.has(item.id)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No skins found matching your search.
        </div>
      )}
    </div>
  );
}