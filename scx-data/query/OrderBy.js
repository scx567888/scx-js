import {isBlank} from "@scx-js/scx-common";
import {QueryImpl} from "./QueryImpl.js";
import {QueryLike} from "./QueryLike.js";

class OrderBy extends QueryLike {

    #selector;
    #orderByType;
    #useExpression;

    constructor(name, orderByType, useExpression) {
        super();
        if (isBlank(name)) {
            throw new Error("OrderBy 参数错误 : 名称 不能为空 !!!");
        }
        if (orderByType == null) {
            throw new Error("OrderBy 参数错误 : orderByType 不能为空 !!!");
        }
        this.#selector = name;
        this.#orderByType = orderByType;
        this.#useExpression = useExpression;
    }


    selector() {
        return this.#selector;
    }

    orderByType() {
        return this.#orderByType;
    }

    useExpression() {
        return this.#useExpression;
    }

    toQuery() {
        return new QueryImpl().orderBy(this);
    }

}

export {OrderBy};
