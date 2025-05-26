import {FieldPolicyLike} from "./FieldPolicyLike.js";
import {FieldPolicyImpl} from "./FieldPolicyImpl.js";
import {EXCLUDED} from "./FilterMode.js";

class AssignField extends FieldPolicyLike {

    #fieldName;
    #expression;

    constructor(fieldName, expression) {
        super();
        if (fieldName == null) {
            throw new Error("fieldName is null");
        }
        if (expression == null) {
            throw new Error("expression is null");
        }
        this.#fieldName = fieldName;
        this.#expression = expression;
    }

    fieldName() {
        return this.#fieldName;
    }

    expression() {
        return this.#expression;
    }

    toFieldPolicy() {
        //排除 0个 就是包含所有
        return new FieldPolicyImpl(EXCLUDED).assignFields(this);
    }

}

export {
    AssignField,
};
