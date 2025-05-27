import {desc, eq, include, serializeFieldPolicyToJson, serializeQueryToJson, whereClause} from "../index.js";

let q = eq("name", 123).asc("name").desc("age");

let qqqq = serializeQueryToJson(q);

console.log(qqqq);

let d = desc("name").where(whereClause("age = 10"));

let serializeQuery1 = serializeQueryToJson(d);

console.log(serializeQuery1);

let fff = include("name").ignoreNull_("aaaa", true).assignField("name", "name + 1");

let fgg = serializeFieldPolicyToJson(fff);

console.log(fgg);
