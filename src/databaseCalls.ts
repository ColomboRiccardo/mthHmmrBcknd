import { createClient } from "@supabase/supabase-js";

const WEAPON_SIMULATION_TABLE = process.env.WEAPON_SIMULATION_TABLE ?? "";
const WEAPON_DATASHEET_TABLE = process.env.WEAPON_DATASHEET_TABLE ?? "";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchAllFromTable = (table: string) => {
  return async () => {
    let { data, error } = await supabase
      .from(table)
      .select("*")
      //.gt("id", 1005);
      //.lt("id", 100);
      .range(0, 9);
    return data;
  };
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
