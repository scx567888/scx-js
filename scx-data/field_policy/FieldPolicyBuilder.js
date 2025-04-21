import {FieldPolicyImpl} from "./FieldPolicyImpl.js";
import {EXCLUDED, INCLUDED} from "./FilterMode.js";

function includeAll() {
    return new FieldPolicyImpl(EXCLUDED);
}

function excludeAll() {
    return new FieldPolicyImpl(INCLUDED);
}

/**
 *
 * @param fieldNames
 * @return {FieldPolicy}
 */
function include(...fieldNames) {
    return excludeAll().include(...fieldNames);
}

/**
 *
 * @param fieldNames
 * @return {FieldPolicy}
 */
function exclude(...fieldNames) {
    return includeAll().exclude(...fieldNames);
}

function ignoreNull(ignoreNull) {
    return includeAll().ignoreNull(ignoreNull);
}

function ignoreNull__(fieldName, ignoreNull) {
    return includeAll().ignoreNull__(fieldName, ignoreNull);
}

function expression(fieldName, expression) {
    return includeAll().expression(fieldName, expression);
}

export {
    includeAll,
    excludeAll,
    include,
    exclude,
    ignoreNull,
    ignoreNull__,
    expression,
};
