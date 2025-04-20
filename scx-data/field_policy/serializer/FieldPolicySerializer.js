import {FieldPolicy} from "../FieldPolicy.js";

class FieldPolicySerializer {

    serialize(obj) {
        if (obj instanceof FieldPolicy) {
            return this.serializeFieldPolicy(obj);
        }
        return obj;
    }

    serializeFieldPolicy(fieldPolicy) {
        return {
            "@type": "FieldPolicy",
            "filterMode": fieldPolicy.filterMode(),
            "fieldNames": fieldPolicy.fieldNames(),
            "ignoreNull": fieldPolicy.ignoreNull_(),
            "ignoreNulls": fieldPolicy.ignoreNulls(),
            "expressions": fieldPolicy.expressions(),
        };
    }

}

const FIELD_POLICY_SERIALIZER = new FieldPolicySerializer();

export {
    FIELD_POLICY_SERIALIZER,
    FieldPolicySerializer,
};
