import {FieldPolicy} from "./FieldPolicy.js";

class FieldPolicyLike extends FieldPolicy {

    #fieldPolicy;

    fieldPolicy() {
        if (this.#fieldPolicy == null) {
            this.#fieldPolicy = this.toFieldPolicy();
        }
        return this.#fieldPolicy;
    }

    include(...fieldNames) {
        this.fieldPolicy().include(...fieldNames);
        return this;
    }

    exclude(...fieldNames) {
        this.fieldPolicy().exclude(...fieldNames);
        return this;
    }

    getFilterMode() {
        return this.fieldPolicy().getFilterMode();
    }

    getFieldNames() {
        return this.fieldPolicy().getFieldNames();
    }

    clearFieldNames() {
        this.fieldPolicy().clearFieldNames();
        return this;
    }

    virtualFields(...virtualFields) {
        this.fieldPolicy().virtualFields(...virtualFields);
        return this;
    }

    getVirtualFields() {
        return this.fieldPolicy().getVirtualFields();
    }

    clearVirtualFields() {
        this.fieldPolicy().clearVirtualFields();
        return this;
    }

    virtualField(virtualFieldName, expression) {
        this.fieldPolicy().virtualField(virtualFieldName, expression);
        return this;
    }

    ignoreNull(ignoreNull) {
        this.fieldPolicy().ignoreNull(ignoreNull);
        return this;
    }

    ignoreNullField(fieldName, ignoreNull) {
        this.fieldPolicy().ignoreNullField(fieldName, ignoreNull);
        return this;
    }

    assignFields(...assignFields) {
        this.fieldPolicy().assignFields(...assignFields);
        return this;
    }

    getIgnoreNull() {
        return this.fieldPolicy().getIgnoreNull();
    }

    getIgnoreNulls() {
        return this.fieldPolicy().getIgnoreNulls();
    }

    getAssignFields() {
        return this.fieldPolicy().getAssignFields();
    }

    clearIgnoreNulls() {
        this.fieldPolicy().clearIgnoreNulls();
        return this;
    }

    clearAssignFields() {
        this.fieldPolicy().clearAssignFields();
        return this;
    }

    removeIgnoreNull(fieldName) {
        this.fieldPolicy().removeIgnoreNull(fieldName);
        return this;
    }

    assignField(fieldName, expression) {
        this.fieldPolicy().assignField(fieldName, expression);
        return this;
    }

    toFieldPolicy() {

    }

}

export {
    FieldPolicyLike,
};
