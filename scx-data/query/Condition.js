import {QueryLike} from "./QueryLike.js";
import {isBlank} from "@scx-js/scx-common";
import {QueryImpl} from "./QueryImpl.js";

class Condition extends QueryLike {

    #selector;
    #conditionType;
    #value1;
    #value2;
    #useExpression;
    #useExpressionValue;
    #skipIfInfo;

    constructor(selector, conditionType, value1, value2, useExpression, useExpressionValue, skipIfInfo) {
        super();
        //名称不能为空
        if (isBlank(selector)) {
            throw new Error("Where 参数错误 : 名称 不能为空 !!!");
        }
        //类型也不能为空
        if (conditionType == null) {
            throw new Error("Where 参数错误 : whereType 不能为空 !!!");
        }
        this.#selector = selector;
        this.#conditionType = conditionType;
        this.#value1 = value1;
        this.#value2 = value2;
        this.#useExpression = useExpression;
        this.#useExpressionValue = useExpressionValue;
        this.#skipIfInfo = skipIfInfo;
    }

    selector() {
        return this.#selector;
    }

    conditionType() {
        return this.#conditionType;
    }

    value1() {
        return this.#value1;
    }

    value2() {
        return this.#value2;
    }

    useExpression() {
        return this.#useExpression;
    }

    useExpressionValue() {
        return this.#useExpressionValue;
    }

    skipIfInfo() {
        return this.#skipIfInfo;
    }

    isEmpty() {

    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {
    Condition,
};
