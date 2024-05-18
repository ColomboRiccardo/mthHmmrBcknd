import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchAllWeapons = async () => {
  let { data: warhammer_40k_weapons, error } = await supabase
    .from("mathHammer_weapon_datasheet")
    .select("*")
    //.gt("id", 1005);
    .lt("id", 100);
  //.range(0, 9);
  return warhammer_40k_weapons;
};

export const apiUpsertTable = async () => {
  const { data, error } = await supabase
    .from("mathHammer_weapon_datasheet")
    .upsert({ some_column: "someValue" })
    .select();
};

export const updateWhichTableColumnById = (table: string) => {
  return async (id: number, columnName: string, value: any) => {
    const { data, error } = await supabase
      .from(table)
      .update({ [columnName]: value })
      .eq("id", id)
      .select();
    console.log(data, error);
  };
};
