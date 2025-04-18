import {EXCLUDED, INCLUDED} from "./FilterMode.js";
import {FieldPolicy} from "./FieldPolicy.js";

class FieldPolicyImpl extends FieldPolicy {

    #filterMode;
    #fieldNames;
    #fieldExpressions;
    #ignoreNullValue;

    constructor(filterMode) {
        super();
        this.#filterMode = filterMode;
        this.#fieldNames = new Set();
        this.#fieldExpressions = new Map();
        this.#ignoreNullValue = true;
    }

    included(...fieldNames) {
        if (this.#filterMode === INCLUDED) {
            this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === EXCLUDED) {
            this.removeFieldNames(...fieldNames);
        }
        return this;
    }

    excluded(...fieldNames) {
        if (this.#filterMode === EXCLUDED) {
            this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === INCLUDED) {
            this.removeFieldNames(...fieldNames);
        }
        return this;
    }

    filterMode() {
        return this.#filterMode;
    }

    fieldNames() {
        return Array.from(this.#fieldNames);
    }

    clearFieldNames() {
        this.#fieldNames.clear();
        return this;
    }

    ignoreNullValue(ignoreNullValue) {
        this.#ignoreNullValue = ignoreNullValue;
        return this;
    }

    ignoreNullValue_() {
        return this.#ignoreNullValue;
    }

    fieldExpression(fieldName, expression) {
        this.#fieldExpressions.set(fieldName, expression);
        return this;
    }

    fieldExpressions() {
        return this.#fieldExpressions;
    }

    clearFieldExpressions() {
        this.#fieldExpressions.clear();
        return this;
    }

    addFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.add(fieldName);
        }
        return this;
    }

    removeFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.delete(fieldName);
        }
        return this;
    }

}

export {FieldPolicyImpl};
