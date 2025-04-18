class FieldPolicy {

    included(...fieldNames) {
        return this;
    }

    excluded(...fieldNames) {
        return this;
    }

    filterMode() {
    }

    fieldNames() {
    }

    clearFieldNames() {
    }

    ignoreNullValue(ignoreNullValue) {
        return this;
    }

    ignoreNullValue_() {
    }

    fieldExpression(fieldName, expression) {
    }

    fieldExpressions() {
    }

    clearFieldExpressions() {
    }

}

export {
    FieldPolicy,
};
