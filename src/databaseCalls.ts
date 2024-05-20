import { createClient } from "@supabase/supabase-js";
import { Weapon } from "./types";
import { WoundsPassed } from "./theoreticalAttackSimulation";

const WEAPON_SIMULATION_TABLE = process.env.WEAPON_SIMULATION_TABLE ?? "";
const WEAPON_HIT_SIMULATION_TABLE = "mathHammer_weapon_hit_simulation";
const WEAPON_WOUND_SIMULATION_TABLE = "mathHammer_weapon_wounds_simulation";
const WEAPON_DATASHEET_TABLE = process.env.WEAPON_DATASHEET_TABLE ?? "";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchAllFromTable = (table: string) => {
  return async (): Promise<Weapon[]> => {
    let { data, error } = await supabase
      .from(table)
      .select("*")
      //.gt("id", 1005);
      .lt("id", 300);
    //.range(0, 1500);
    //.range(0, 9);
    if (data == null) {
      throw new Error("no data");
    }
    return data;
  };
};

export const updateWeaponHitSimulationColById = async (
  id: number,
  mode: string,
  name: string,
  attacksLanded: number[]
) => {
  const { data, error } = await supabase
    .from(WEAPON_HIT_SIMULATION_TABLE)
    .insert([
      {
        weapon_id: id,
        weapon_name: name,
        weapon_theor_hits: attacksLanded,
        weapon_mode: mode,
      },
    ])
    .select();
  console.log(data, error);
};

export const updateWeaponWoundSimulationColById = async (
  id: number,
  mode: string,
  name: string,
  strength: number,
  hit: number,
  wounds: number[]
) => {
  const { data, error } = await supabase
    .from(WEAPON_WOUND_SIMULATION_TABLE)
    .insert([
      {
        weapon_id: id,
        weapon_name: name,
        weapon_mode: mode,
        weapon_strength: strength,
        weapon_hit: hit,
        weapon_wounds: wounds,
      },
    ])
    .select();
  console.log(data, error);
};

const updateWhichTableColumnById = (table: string) => {
  return async (id: number, columnName: string, value: any) => {
    const { data, error } = await supabase
      .from(table)
      .update({ [columnName]: value })
      .eq("id", id)
      .select();
    console.log(data, error);
  };
};

export const apiUpsertTable = async () => {
  const { data, error } = await supabase
    .from(WEAPON_DATASHEET_TABLE)
    .upsert({ some_column: "someValue" })
    .select();
};

//   attacksObjectArray?.forEach((weapon) => {
//     apiUpdateColById(
//       weapon.id,
//       "weapon_theoretical_attacks_landed",
//       weapon.weapon_theoretical_attacks_landed
//     );
//   });

export const fetchAllFromWeaponsTable = fetchAllFromTable(
  WEAPON_DATASHEET_TABLE
);
export const updateWeaponSimulationTableColumnById = updateWhichTableColumnById(
  WEAPON_SIMULATION_TABLE
);
