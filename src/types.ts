export type DiceValues = 1 | 2 | 3 | 4 | 5 | 6;

export type Weapon = {
  id: number;
  datasheet_id: number;
  weapon_name: string;
  weapon_keywords: string;
  weapon_range: number;
  weapon_type: string;
  weapon_attack: string;
  weapon_strength: string;
  weapon_armor_penetration: number;
  weapon_damage: string;
  weapon_skill: number;
};

export type WeaponsKeywords =
  | "blast" //extra attacks
  | "pistol"
  | "assault"
  | "hazardous"
  | "heavy" //to hit
  | "twin-linked" //to wound
  | "sustained hits 1" //to hit
  | "precision"
  | "rapid fire 1" //extra attacks
  | "rapid fire 2" //extra attacks
  | "anti-infantry 4+"
  | "torrent"
  | "ignore cover"
  | "anti-vehicle 4+" //to wound
  | "devastating wounds"
  | "melta" //damage
  | "conversion"
  | "indirect fire"; //to hit

export type ToughnessValues = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type StrengthValues = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
