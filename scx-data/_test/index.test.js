import {eq, QUERY_SERIALIZER} from "../index.js";

let q = eq("name", 123);

let serializeQuery = QUERY_SERIALIZER.serializeQuery(q);

console.log(serializeQuery);
