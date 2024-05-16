const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const apiTry = async () => {
  let { data: warhammer_40k_weapons, error } = await supabase
    .from("warhammer_40k_weapons")
    .select("*")
    .range(0, 2);
  console.log(warhammer_40k_weapons);
  console.log(error);
};

apiTry();

//to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//to run this file, use  npde --env-file=.env index.js, to specify which file is the .env
