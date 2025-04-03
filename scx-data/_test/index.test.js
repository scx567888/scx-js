import {desc, eq, QUERY_SERIALIZER} from "../index.js";

let q = eq("name", 123).addOrderBy("asc name").addOrderBy("desc age");

let serializeQuery = QUERY_SERIALIZER.serializeQuery(q);

console.log(serializeQuery);

let d = desc("name").addWhere("age = 10");

let serializeQuery1 = QUERY_SERIALIZER.serializeQuery(d);

console.log(serializeQuery1);
