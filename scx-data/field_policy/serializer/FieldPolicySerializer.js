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
            "ignoreNullValue": fieldPolicy.ignoreNullValue_(),
            "fieldExpressions": fieldPolicy.fieldExpressions(),
        };
    }

}

const FIELD_POLICY_SERIALIZER = new FieldPolicySerializer();

export {
    FIELD_POLICY_SERIALIZER,
    FieldPolicySerializer,
};
