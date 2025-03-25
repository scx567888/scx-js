import {desc, eq, QUERY_SERIALIZER} from "../index.js";

let q = eq("name", 123);

let serializeQuery = QUERY_SERIALIZER.serializeQuery(q);

console.log(serializeQuery);

let d = desc("name");

let serializeQuery1 = QUERY_SERIALIZER.serializeQuery(d);

console.log(serializeQuery1);
