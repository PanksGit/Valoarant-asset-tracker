import { items, type Item, type InsertItem } from "@shared/schema";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IStorage {
  getAllItems(): Promise<Item[]>;
  getItemsByType(type: string): Promise<Item[]>;
}

export class MemStorage implements IStorage {
  private items: Map<string, Item[]> = new Map();
  private loadedCategories: Set<string> = new Set();
  private loading: { [key: string]: Promise<void> } = {};

  constructor() {
    console.log('Initializing MemStorage with lazy loading...');
  }

  private async loadCategory(category: string): Promise<void> {
    if (this.loading[category]) {
      await this.loading[category];
      return;
    }

    // Use the resolved __dirname
    const dataDir = path.join(__dirname, 'data');
    const fileName = `${category.toLowerCase()}.json`;
    const filePath = path.join(dataDir, fileName);

    console.time(`load:${category}`);
    try {
      try {
        await fs.access(filePath);
      } catch (error) {
        console.error(`File ${fileName} not found in ${dataDir}`);
        throw new Error(`Data file not found: ${fileName}`);
      }

      this.loading[category] = (async () => {
        console.log(`Loading ${category} data from ${fileName}...`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log(`File ${fileName} read, size: ${fileContent.length} bytes`);

        console.time(`parse:${category}`);
        let data;
        try {
          data = JSON.parse(fileContent);
        } catch (error) {
          console.error(`Failed to parse ${fileName}: ${error}`);
          throw new Error(`Invalid JSON in ${fileName}`);
        }
        console.timeEnd(`parse:${category}`);

        this.validateWeaponData(category, data);

        const items = Object.values(data).flat() as Item[];
        this.items.set(category, items);
        this.loadedCategories.add(category);

        console.log(`Successfully loaded ${items.length} items for ${category}`);
      })();

      await this.loading[category];
      delete this.loading[category];
      console.timeEnd(`load:${category}`);
    } catch (error) {
      delete this.loading[category];
      console.error(`Error loading ${category} data:`, error);
      throw error;
    }
  }

  private validateWeaponData(filename: string, data: any) {
    if (!data || typeof data !== 'object') {
      throw new Error(`Invalid data structure in ${filename}: expected object`);
    }

    console.log(`Categories found in ${filename}:`, Object.keys(data));

    for (const [category, weapons] of Object.entries(data)) {
      if (!Array.isArray(weapons)) {
        throw new Error(`Invalid category ${category} in ${filename}: expected array`);
      }

      weapons.forEach((weapon: any, index: number) => {
        if (!weapon.id || !weapon.name || !weapon.type ||
            typeof weapon.cost !== 'number' || !weapon.rarity ||
            typeof weapon.isBaseSkin !== 'boolean') {
          throw new Error(`Invalid weapon data in ${filename}, category ${category}, index ${index}`);
        }
      });
    }
  }

  async getAllItems(): Promise<Item[]> {
    const categories = ['sidearms', 'shotguns', 'machine_guns', 'sniper_rifles', 'rifles', 'melee', 'battle_passes', 'vct', 'champions', 'bundles', 'smgs'];
    console.time('loadAllCategories');

    try {
      await Promise.all(categories.map(category => this.loadCategory(category)));
      console.timeEnd('loadAllCategories');

      return Array.from(this.items.values()).flat();
    } catch (error) {
      console.error('Error loading all items:', error);
      throw error;
    }
  }

  async getItemsByType(type: string): Promise<Item[]> {
    let category: string;
    if (['Classic', 'Shorty', 'Frenzy', 'Ghost', 'Sheriff'].includes(type)) {
      category = 'sidearms';
    } else if (['Bucky', 'Judge'].includes(type)) {
      category = 'shotguns';
    } else if (['Ares', 'Odin'].includes(type)) {
      category = 'machine_guns';
    } else if (['Marshal', 'Operator', 'Outlaw'].includes(type)) {
      category = 'sniper_rifles';
    } else if (['Bulldog', 'Guardian', 'Phantom', 'Vandal'].includes(type)) {
      category = 'rifles';
    } else if (type === 'Melee') {
      category = 'melee';
    } else if (type.startsWith('Episode')) {
      category = 'battle_passes';
    } else if (['Americas', 'EMEA', 'Pacific', 'CN'].includes(type)) {
      category = 'vct';
    } else if (type.startsWith('Champions')) {
      category = 'champions';
    } else if (type === 'Bundle') {
      category = 'bundles';
    } else if (['Stinger', 'Spectre'].includes(type)) {
      category = 'smgs';
    } else {
      throw new Error(`Unknown weapon type: ${type}`);
    }

    try {
      await this.loadCategory(category);
      const categoryItems = this.items.get(category) || [];
      return categoryItems.filter(item => item.type === type);
    } catch (error) {
      console.error(`Error getting items for type ${type}:`, error);
      throw error;
    }
  }
}

export const storage = new MemStorage();