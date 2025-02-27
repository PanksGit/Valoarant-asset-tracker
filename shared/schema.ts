import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  cost: integer("cost").notNull(),
  rarity: text("rarity").notNull(),
  isBaseSkin: boolean("is_base_skin").default(false).notNull(),
});

export const insertItemSchema = createInsertSchema(items).pick({
  name: true,
  type: true,
  cost: true,
  rarity: true,
  isBaseSkin: true,
});

export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;

export type CategoryType = 'Classic' | 'Shorty' | 'Frenzy' | 'Ghost' | 'Sheriff' |
                         'Stinger' | 'Spectre' | 'Bucky' | 'Judge' | 'Bulldog' |
                         'Guardian' | 'Phantom' | 'Vandal' | 'Marshal' | 'Operator' |
                         'Outlaw' | 'Ares' | 'Odin' | 'Melee';