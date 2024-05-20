"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWeaponSimulationTableColumnById = exports.fetchAllFromWeaponsTable = exports.apiUpsertTable = exports.updateWeaponWoundSimulationColById = exports.updateWeaponHitSimulationColById = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const WEAPON_SIMULATION_TABLE = (_a = process.env.WEAPON_SIMULATION_TABLE) !== null && _a !== void 0 ? _a : "";
const WEAPON_HIT_SIMULATION_TABLE = "mathHammer_weapon_hit_simulation";
const WEAPON_WOUND_SIMULATION_TABLE = "mathHammer_weapon_wounds_simulation";
const WEAPON_DATASHEET_TABLE = (_b = process.env.WEAPON_DATASHEET_TABLE) !== null && _b !== void 0 ? _b : "";
const supabaseUrl = (_c = process.env.REACT_APP_SUPABASE_URL) !== null && _c !== void 0 ? _c : "";
const supabaseKey = (_d = process.env.REACT_APP_SUPABASE_KEY) !== null && _d !== void 0 ? _d : "";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const fetchAllFromTable = (table) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        let { data, error } = yield supabase
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
    });
};
const updateWeaponHitSimulationColById = (id, mode, name, attacksLanded) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
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
});
exports.updateWeaponHitSimulationColById = updateWeaponHitSimulationColById;
const updateWeaponWoundSimulationColById = (id, mode, name, strength, hit, wounds) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
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
});
exports.updateWeaponWoundSimulationColById = updateWeaponWoundSimulationColById;
const updateWhichTableColumnById = (table) => {
    return (id, columnName, value) => __awaiter(void 0, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from(table)
            .update({ [columnName]: value })
            .eq("id", id)
            .select();
        console.log(data, error);
    });
};
const apiUpsertTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from(WEAPON_DATASHEET_TABLE)
        .upsert({ some_column: "someValue" })
        .select();
});
exports.apiUpsertTable = apiUpsertTable;
//   attacksObjectArray?.forEach((weapon) => {
//     apiUpdateColById(
//       weapon.id,
//       "weapon_theoretical_attacks_landed",
//       weapon.weapon_theoretical_attacks_landed
//     );
//   });
exports.fetchAllFromWeaponsTable = fetchAllFromTable(WEAPON_DATASHEET_TABLE);
exports.updateWeaponSimulationTableColumnById = updateWhichTableColumnById(WEAPON_SIMULATION_TABLE);
