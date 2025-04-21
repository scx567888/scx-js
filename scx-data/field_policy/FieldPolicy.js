class FieldPolicy {

    include(...fieldNames) {
        return this;
    }

    exclude(...fieldNames) {
        return this;
    }

    filterMode() {
    }

    fieldNames() {
    }

    clearFieldNames() {
    }

    ignoreNull(ignoreNullValue) {
        return this;
    }

    ignoreNull_() {
    }

    ignoreNull__(fieldName, ignoreNullValue) {
    }

    removeIgnoreNull(fieldName) {
    }

    ignoreNulls() {
    }

    clearIgnoreNulls() {
    }

    expression(fieldName, expression) {
    }

    expressions() {
    }

    removeExpression(fieldName) {
    }

    clearExpressions() {
    }

}

export {
    FieldPolicy,
};
