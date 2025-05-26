import {FieldPolicyLike} from "./FieldPolicyLike.js";
import {FieldPolicyImpl} from "./FieldPolicyImpl.js";
import {EXCLUDED} from "./FilterMode.js";

class VirtualField extends FieldPolicyLike {

    #virtualFieldName;
    #expression;

    constructor(virtualFieldName, expression) {
        super();
        if (virtualFieldName == null) {
            throw new Error("virtualFieldName is null");
        }
        if (expression == null) {
            throw new Error("expression is null");
        }
        this.#virtualFieldName = virtualFieldName;
        this.#expression = expression;
    }

    virtualFieldName() {
        return this.#virtualFieldName;
    }

    expression() {
        return this.#expression;
    }

    toFieldPolicy() {
        //排除 0个 就是包含所有
        return new FieldPolicyImpl(EXCLUDED).virtualFields(this);
    }

}

export {
    VirtualField,
};
