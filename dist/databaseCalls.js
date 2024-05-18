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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiUpdateColById = exports.apiUpsertTable = exports.fetchAllWeapons = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = (_a = process.env.REACT_APP_SUPABASE_URL) !== null && _a !== void 0 ? _a : "";
const supabaseKey = (_b = process.env.REACT_APP_SUPABASE_KEY) !== null && _b !== void 0 ? _b : "";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const fetchAllWeapons = () => __awaiter(void 0, void 0, void 0, function* () {
    let { data: warhammer_40k_weapons, error } = yield supabase
        .from("mathHammer_weapon_datasheet")
        .select("*");
    //.range(0, 9);
    return warhammer_40k_weapons;
});
exports.fetchAllWeapons = fetchAllWeapons;
const apiUpsertTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("mathHammer_weapon_datasheet")
        .upsert({ some_column: "someValue" })
        .select();
});
exports.apiUpsertTable = apiUpsertTable;
const apiUpdateColById = (id, columnName, value) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("mathHammer_weapon_datasheet")
        .update({ [columnName]: value })
        .eq("id", id)
        .select();
    console.log(data, error);
});
exports.apiUpdateColById = apiUpdateColById;
