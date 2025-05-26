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
            "filterMode": fieldPolicy.getFilterMode(),
            "fieldNames": fieldPolicy.getFieldNames(),
            "virtualFields": this.serializeVirtualFields(fieldPolicy.getVirtualFields()),
            "ignoreNull": fieldPolicy.getIgnoreNull(),
            "ignoreNulls": fieldPolicy.getIgnoreNulls(),
            "assignFields": this.serializeAssignFields(fieldPolicy.getAssignFields()),
        };
    }

    serializeVirtualFields(v) {
        return v.map(s => this.serializeVirtualField(s));
    }

    serializeVirtualField(v) {
        return {
            "@type": "VirtualField",
            "expression": v.expression(),
            "virtualFieldName": v.virtualFieldName(),
        };
    }

    serializeAssignFields(v) {
        return v.map(s => this.serializeAssignField(s));
    }

    serializeAssignField(v) {
        return {
            "@type": "AssignField",
            "fieldName": v.fieldName(),
            "expression": v.expression(),
        };
    }

}

const FIELD_POLICY_SERIALIZER = new FieldPolicySerializer();

export {
    FIELD_POLICY_SERIALIZER,
    FieldPolicySerializer,
};
