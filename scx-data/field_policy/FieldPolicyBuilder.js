import {FieldPolicyImpl} from "./FieldPolicyImpl.js";
import {EXCLUDED, INCLUDED} from "./FilterMode.js";

function includedAll() {
    return new FieldPolicyImpl(EXCLUDED);
}

function excludedAll() {
    return new FieldPolicyImpl(INCLUDED);
}

/**
 *
 * @param fieldNames
 * @return {FieldPolicy}
 */
function included(...fieldNames) {
    return excludedAll().included(fieldNames);
}

/**
 *
 * @param fieldNames
 * @return {FieldPolicy}
 */
function excluded(...fieldNames) {
    return includedAll().excluded(fieldNames);
}

function ignoreNullValue(ignoreNullValue) {
    return includedAll().ignoreNullValue(ignoreNullValue);
}

function fieldExpression(fieldName, expression) {
    return includedAll().fieldExpression(fieldName, expression);
}

export {
    includedAll,
    excludedAll,
    included,
    excluded,
    ignoreNullValue,
    fieldExpression,
};
