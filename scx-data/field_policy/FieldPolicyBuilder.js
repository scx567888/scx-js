import {FieldPolicyImpl} from "./FieldPolicyImpl.js";
import {EXCLUDED, INCLUDED} from "./FilterMode.js";
import {AssignField} from "./AssignField.js";
import {VirtualField} from "./VirtualField.js";

function includeAll() {
    return new FieldPolicyImpl(EXCLUDED);
}

function excludeAll() {
    return new FieldPolicyImpl(INCLUDED);
}

function include(...fieldNames) {
    return excludeAll().include(...fieldNames);
}

function exclude(...fieldNames) {
    return includeAll().exclude(...fieldNames);
}

/// 默认包含所有
function ignoreNull(ignoreNull) {
    return includeAll().ignoreNull(ignoreNull);
}

/// 默认包含所有
function ignoreNull_(fieldName, ignoreNull) {
    return includeAll().ignoreNull_(fieldName, ignoreNull);
}

/// 默认包含所有
function assignField(fieldName, expression) {
    return new AssignField(fieldName, expression);
}

function virtualField(virtualFieldName, expression) {
    return new VirtualField(virtualFieldName, expression);
}

export {
    includeAll,
    excludeAll,
    include,
    exclude,
    ignoreNull,
    ignoreNull_,
    assignField,
    virtualField,
};
