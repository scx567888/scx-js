import {EXCLUDED, INCLUDED} from "./FilterMode.js";
import {FieldPolicy} from "./FieldPolicy.js";

class FieldPolicyImpl extends FieldPolicy {

    #filterMode;
    #fieldNames;
    #expressions;
    #ignoreNulls;
    #ignoreNull;

    constructor(filterMode) {
        super();
        this.#filterMode = filterMode;
        this.#fieldNames = new Set();
        this.#expressions = new Map();
        this.#ignoreNulls = new Map();
        this.#ignoreNull = true;
    }

    include(...fieldNames) {
        if (this.#filterMode === INCLUDED) {
            this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === EXCLUDED) {
            this.removeFieldNames(...fieldNames);
        }
        return this;
    }

    exclude(...fieldNames) {
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

    ignoreNull(ignoreNullValue) {
        this.#ignoreNull = ignoreNullValue;
        return this;
    }

    ignoreNull_() {
        return this.#ignoreNull;
    }

    ignoreNull__(fieldName, ignoreNull) {
        this.#ignoreNulls.set(fieldName, ignoreNull);
        return this;
    }

    removeIgnoreNull(fieldName) {
        this.#ignoreNulls.delete(fieldName);
        return this;
    }

    ignoreNulls() {
        return this.#ignoreNulls;
    }

    clearIgnoreNulls() {
        this.#ignoreNulls.clear();
        return this;
    }

    expression(fieldName, expression) {
        this.#expressions.set(fieldName, expression);
        return this;
    }

    expressions() {
        return this.#expressions;
    }

    removeExpression(fieldName) {
        this.#expressions.delete(fieldName);
        return this;
    }

    clearExpressions() {
        this.#expressions.clear();
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
