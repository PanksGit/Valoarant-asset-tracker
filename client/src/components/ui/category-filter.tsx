import { Category, WEAPON_CATEGORIES, CATEGORY_TYPES } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react"; // Add this import

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
  selectedItems: number[];
  onCustomVPAdd?: (amount: number) => void;
  onCustomVPRemove?: (id: number) => void;
  onSelectAll?: (type: string, shouldSelect: boolean) => void;
  onDeselectAll?: () => void;
  customVPAmounts?: { id: number; amount: number; }[];
}

export function CategoryFilter({ 
  selected, 
  onChange, 
  selectedItems = [], 
  onCustomVPAdd,
  onCustomVPRemove,
  onSelectAll,
  onDeselectAll,
  customVPAmounts = []
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Sidearms");
  const [customVP, setCustomVP] = useState("");

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    // For Melee and Bundle categories, directly trigger onChange since they don't have subcategories
    if (category === "Melee" || category === "Bundle" || category === "Others") {
      onChange(category);
    }
  };

  const handleCustomVPAdd = () => {
    const vpAmount = parseInt(customVP);
    if (!isNaN(vpAmount) && vpAmount > 0) {
      onCustomVPAdd?.(vpAmount);
      setCustomVP(""); // Clear input after adding
    }
  };

  const renderSubcategories = () => {
    // Don't show subcategories for Melee and Bundle
    if (activeCategory === "Melee" || activeCategory === "Bundle") {
      return null;
    }

    // Show custom VP input and list for Others category
    if (activeCategory === "Others") {
      return (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 mb-4 text-sm text-muted-foreground">
            Add custom VP amounts for:
            <ul className="list-disc ml-4 mt-2">
              <li>Purchased agents</li>
              <li>Missing items or skins</li>
              <li>Other VP expenses</li>
            </ul>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Input
              type="number"
              placeholder="Enter VP amount"
              value={customVP}
              onChange={(e) => setCustomVP(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCustomVPAdd();
                }
              }}
              className="w-[140px] sm:w-[200px]"
              min="1"
            />
            <Button 
              onClick={handleCustomVPAdd} 
              variant="outline"
              disabled={!customVP || parseInt(customVP) <= 0}
              className="whitespace-nowrap"
            >
              Add to Total
            </Button>
          </div>

          {/* Show list of added custom VP amounts */}
          {customVPAmounts.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-sm">Added Custom Amounts:</h3>
              <div className="space-y-2">
                {customVPAmounts.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between bg-muted rounded-md p-2"
                  >
                    <span className="font-medium">{item.amount.toLocaleString()} VP</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCustomVPRemove?.(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove custom VP amount</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    const types = CATEGORY_TYPES[activeCategory] || [];

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {types.map((type) => (
            <div key={type} className="flex flex-col gap-2">
              <button
                onClick={() => onChange(type)}
                className={`px-3 sm:px-4 py-2 rounded-md border transition-colors text-sm sm:text-base
                  ${selected === type 
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-accent border-border'
                  }`}
              >
                {type}
              </button>
              {selected === type && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSelectAll?.(type, selectedItems.length === 0)}
                  className="text-xs"
                >
                  {selectedItems.length > 0 ? "Deselect All" : "Select All"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeCategory} onValueChange={(value) => handleCategoryChange(value as Category)}>
          <TabsList className="flex flex-wrap h-auto py-1 px-1 gap-1">
            {WEAPON_CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-sm sm:text-base px-2 sm:px-4 py-1.5 sm:py-2 h-auto"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {selectedItems.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDeselectAll}
            className="text-xs whitespace-nowrap"
          >
            Deselect All Items
          </Button>
        )}
      </div>

      {renderSubcategories()}
    </div>
  );
}