class FieldPolicy {

    include(...fieldNames) {
        return this;
    }

    exclude(...fieldNames) {
        return this;
    }

    getFilterMode() {
    }

    getFieldNames() {
    }

    clearFieldNames() {
        return this;
    }

    virtualFields(...virtualFields) {
        return this;
    }

    getVirtualFields() {
    }

    clearVirtualFields() {
        return this;
    }

    virtualField(virtualFieldName, expression) {
        return this;
    }

    ignoreNull(ignoreNull) {
        return this;
    }

    ignoreNull_(fieldName, ignoreNull) {
        return this;
    }

    assignFields(...assignFields) {
        return this;
    }

    getIgnoreNull() {
    }

    getIgnoreNulls() {
    }

    getAssignFields() {
    }

    clearIgnoreNulls() {
        return this;
    }

    clearAssignFields() {
        return this;
    }

    removeIgnoreNull(fieldName) {
        return this;
    }

    assignField(fieldName, expression) {
        return this;
    }

}

export {
    FieldPolicy
}
