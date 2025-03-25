import {isBlank} from "@scx-js/scx-common";
import {QueryImpl} from "./QueryImpl.js";
import {ofInfo} from "./QueryOption.js";
import {QueryLike} from "./QueryLike.js";

class OrderBy extends QueryLike {

    #name;
    #orderByType;
    #info;

    constructor(name, orderByType, ...options) {
        super();
        if (isBlank(name)) {
            throw new Error("OrderBy 参数错误 : 名称 不能为空 !!!");
        }
        if (orderByType == null) {
            throw new Error("OrderBy 参数错误 : orderByType 不能为空 !!!");
        }
        this.#name = name;
        this.#orderByType = orderByType;
        this.#info = ofInfo(...options);
    }


    name() {
        return this.#name;
    }

    orderByType() {
        return this.#orderByType;
    }

    info() {
        return this.#info;
    }

    toQuery() {
        return new QueryImpl().orderBy(this);
    }

}

export {OrderBy};
