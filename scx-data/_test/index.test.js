import {desc, eq, FIELD_POLICY_SERIALIZER, include, QUERY_SERIALIZER, whereClause} from "../index.js";

let q = eq("name", 123).asc("name").desc("age");

let serializeQuery = QUERY_SERIALIZER.serializeQuery(q);

console.log(serializeQuery);

let d = desc("name").where(whereClause("age = 10"));

let serializeQuery1 = QUERY_SERIALIZER.serializeQuery(d);

console.log(serializeQuery1);

let fff = include("name").ignoreNull_("aaaa", true).assignField("name", "name + 1");

let fgg = FIELD_POLICY_SERIALIZER.serializeFieldPolicy(fff);

console.log(fgg);
