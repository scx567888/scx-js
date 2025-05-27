import {FieldPolicy} from "../field_policy/FieldPolicy.js";

function serializeFieldPolicyToJson(fieldPolicy) {
    return JSON.stringify(serializeFieldPolicy(fieldPolicy));
}

function serializeFieldPolicy(fieldPolicy) {
    return {
        "@type": "FieldPolicy",
        "filterMode": fieldPolicy.getFilterMode(),
        "fieldNames": fieldPolicy.getFieldNames(),
        "virtualFields": serializeVirtualFields(fieldPolicy.getVirtualFields()),
        "ignoreNull": fieldPolicy.getIgnoreNull(),
        "ignoreNulls": fieldPolicy.getIgnoreNulls(),
        "assignFields": serializeAssignFields(fieldPolicy.getAssignFields()),
    };
}

function serializeVirtualField(virtualField) {
    return {
        "@type": "VirtualField",
        "expression": virtualField.expression(),
        "virtualFieldName": virtualField.virtualFieldName(),
    };
}


function serializeAssignField(assignField) {
    return {
        "@type": "AssignField",
        "fieldName": assignField.fieldName(),
        "expression": assignField.expression(),
    };
}

function serializeVirtualFields(virtualFields) {
    return virtualFields.map(s => serializeVirtualField(s));
}

function serializeAssignFields(assignFields) {
    return assignFields.map(s => serializeAssignField(s));
}

export {
    serializeFieldPolicyToJson,
    serializeFieldPolicy,
};
