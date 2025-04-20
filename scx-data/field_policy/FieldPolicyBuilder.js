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
    return excludedAll().included(...fieldNames);
}

/**
 *
 * @param fieldNames
 * @return {FieldPolicy}
 */
function excluded(...fieldNames) {
    return includedAll().excluded(...fieldNames);
}

function ignoreNull(ignoreNull) {
    return includedAll().ignoreNull(ignoreNull);
}

function ignoreNull__(fieldName, ignoreNull) {
    return includedAll().ignoreNull__(fieldName, ignoreNull);
}

function expression(fieldName, expression) {
    return includedAll().expression(fieldName, expression);
}

export {
    includedAll,
    excludedAll,
    included,
    excluded,
    ignoreNull,
    ignoreNull__,
    expression,
};
