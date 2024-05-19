import { WeaponsKeywords } from "./types";

export const attacksLandedModifier = (
  keywords: WeaponsKeywords[],
  attack: number
) => {
  let modifier = 0;
  if (keywords.includes("sustained hits 1")) {
    modifier += 1 / 6;
  }
  if (keywords.includes("heavy")) {
    modifier += 1 / 6;
  }
  if (keywords.includes("indirect fire")) {
    modifier += 1 / 6;
  }
};
