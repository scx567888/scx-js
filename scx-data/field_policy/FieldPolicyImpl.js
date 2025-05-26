import {EXCLUDED, INCLUDED} from "./FilterMode.js";
import {FieldPolicy} from "./FieldPolicy.js";
import {AssignField} from "./AssignField.js";
import {VirtualField} from "./VirtualField.js";

class FieldPolicyImpl extends FieldPolicy {

    #filterMode;
    #fieldNames;
    #ignoreNulls;
    #virtualFields;
    #assignFields;
    #ignoreNull;

    constructor(filterMode) {
        super();
        this.#filterMode = filterMode;
        this.#fieldNames = new Set();
        this.#virtualFields = [];
        this.#assignFields = [];
        this.#ignoreNulls = new Map();
        this.#ignoreNull = true;
    }

    include(...fieldNames) {
        if (this.#filterMode === INCLUDED) {
            return this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === EXCLUDED) {
            return this.removeFieldNames(...fieldNames);
        }
    }

    exclude(...fieldNames) {
        if (this.#filterMode === INCLUDED) {
            return this.removeFieldNames(...fieldNames);
        } else if (this.#filterMode === EXCLUDED) {
            return this.addFieldNames(...fieldNames);
        }
    }

    getFilterMode() {
        return this.#filterMode;
    }

    getFieldNames() {
        return Array.from(this.#fieldNames);
    }

    clearFieldNames() {
        this.#fieldNames.clear();
        return this;
    }

    addFieldNames(...fieldNames) {
        for (const name of fieldNames) {
            this.#fieldNames.add(name);
        }
        return this;
    }

    removeFieldNames(...fieldNames) {
        for (const name of fieldNames) {
            this.#fieldNames.delete(name);
        }
        return this;
    }

    virtualFields(...virtualFields) {
        this.#virtualFields = [...virtualFields];
        return this;
    }

    getVirtualFields() {
        return this.#virtualFields;
    }

    clearVirtualFields() {
        this.#virtualFields = [];
        return this;
    }

    virtualField(name, expression) {
        this.#virtualFields.push(new VirtualField(name, expression));
        return this;
    }

    ignoreNull(ignoreNull) {
        this.#ignoreNull = ignoreNull;
        return this;
    }

    ignoreNull_(fieldName, ignoreNull) {
        this.#ignoreNulls.set(fieldName, ignoreNull);
        return this;
    }

    assignFields(...assignFields) {
        this.#assignFields = [...assignFields];
        return this;
    }

    getIgnoreNull() {
        return this.#ignoreNull;
    }

    getIgnoreNulls() {
        return Object.fromEntries(this.#ignoreNulls);
    }

    getAssignFields() {
        return this.#assignFields;
    }

    clearIgnoreNulls() {
        this.#ignoreNulls.clear();
        return this;
    }

    clearAssignFields() {
        this.#assignFields = [];
        return this;
    }

    removeIgnoreNull(fieldName) {
        this.#ignoreNulls.delete(fieldName);
        return this;
    }

    assignField(fieldName, expression) {
        this.#assignFields.push(new AssignField(fieldName, expression));
        return this;
    }

}

export {FieldPolicyImpl};
