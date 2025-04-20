import {desc, eq, FIELD_POLICY_SERIALIZER, included, QUERY_SERIALIZER} from "../index.js";

let q = eq("name", 123).addOrderBy("asc name").addOrderBy("desc age");

let serializeQuery = QUERY_SERIALIZER.serializeQuery(q);

console.log(serializeQuery);

let d = desc("name").addWhere("age = 10");

let serializeQuery1 = QUERY_SERIALIZER.serializeQuery(d);

console.log(serializeQuery1);

let fff = included("name").ignoreNull__("aaaa", true).expression("name", "name + 1");

let fgg = FIELD_POLICY_SERIALIZER.serializeFieldPolicy(fff);

console.log(fgg);
