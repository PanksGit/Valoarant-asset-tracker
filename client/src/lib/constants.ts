import { z } from "zod";

export const WEAPON_CATEGORIES = [
  "Sidearms",
  "SMGs",
  "Shotguns",
  "Rifles",
  "Sniper Rifles",
  "Machine Guns",
  "Battle Passes",
  "VCT",
  "Champions",
  "Bundle",
  "Melee",
  "Others"
] as const;

export const SIDEARM_TYPES = [
  "Classic",
  "Shorty",
  "Frenzy", 
  "Ghost",
  "Sheriff"
] as const;

export const SMG_TYPES = [
  "Stinger",
  "Spectre"
] as const;

export const SHOTGUN_TYPES = [
  "Bucky",
  "Judge"
] as const;

export const RIFLE_TYPES = [
  "Bulldog",
  "Guardian",
  "Phantom",
  "Vandal"
] as const;

export const SNIPER_TYPES = [
  "Marshal",
  "Operator",
  "Outlaw"
] as const;

export const MACHINE_GUN_TYPES = [
  "Ares",
  "Odin"
] as const;

export const BATTLE_PASS_TYPES = [
  "Episode 1: IGNITION",
  "Episode 2: FORMATION",
  "Episode 3: REFLECTION",
  "Episode 4: DISRUPTION",
  "Episode 5: DIMENSION",
  "Episode 6: REVELATION",
  "Episode 7: EVOLUTION",
  "Episode 8: DEFIANCE",
  "Episode 9: COLLISION",
  "Episode 10"
] as const;

export const VCT_REGIONS = [
  "Americas",
  "EMEA",
  "Pacific",
  "CN"
] as const;

export const CHAMPIONS_TYPES = [
  "Champions 2021 Collection",
  "Champions 2022 Collection",
  "Champions 2023 Collection",
  "Champions 2024 Collection"
] as const;

export const BUNDLE_TYPES = [] as const;

export const categorySchema = z.enum(WEAPON_CATEGORIES);
export type Category = z.infer<typeof categorySchema>;
export const sidearmSchema = z.enum(SIDEARM_TYPES);
export const smgSchema = z.enum(SMG_TYPES);
export const shotgunSchema = z.enum(SHOTGUN_TYPES);
export const rifleSchema = z.enum(RIFLE_TYPES);
export const sniperSchema = z.enum(SNIPER_TYPES);
export const machineGunSchema = z.enum(MACHINE_GUN_TYPES);
export const battlePassSchema = z.enum(BATTLE_PASS_TYPES);
export const vctRegionsSchema = z.enum(VCT_REGIONS);
export const championsSchema = z.enum(CHAMPIONS_TYPES);
export const bundleSchema = z.enum(BUNDLE_TYPES);

export const CATEGORY_TYPES: Record<Category, readonly string[]> = {
  "Sidearms": SIDEARM_TYPES,
  "SMGs": SMG_TYPES,
  "Shotguns": SHOTGUN_TYPES,
  "Rifles": RIFLE_TYPES,
  "Sniper Rifles": SNIPER_TYPES,
  "Machine Guns": MACHINE_GUN_TYPES,
  "Battle Passes": BATTLE_PASS_TYPES,
  "VCT": VCT_REGIONS,
  "Champions": CHAMPIONS_TYPES,
  "Bundle": BUNDLE_TYPES,
  "Melee": [],
  "Others": []
};