import {Query} from "./Query.js";
import {checkUseExpression} from "./BuildControl.js";
import {OrderBy} from "./OrderBy.js";
import {ASC, DESC} from "./OrderByType.js";

class QueryImpl extends Query {

    #where;
    #orderBys;
    #offset;
    #limit;

    /**
     * 创建 Query 对象
     */
    constructor(old) {
        super();
        this.#where = null;
        this.#orderBys = [];
        this.#offset = null;
        this.#limit = null;
    }

    where(where) {
        this.#where = where;
        return this;
    }


    orderBys(...orderBys) {
        this.#orderBys = [...orderBys];
        return this;
    }


    offset(offset) {
        if (offset < 0) {
            throw new Error("Limit 参数错误 : offset (偏移量) 不能小于 0 !!!");
        }
        this.#offset = offset;
        return this;
    }

    limit(limit) {
        if (limit < 0) {
            throw new Error("Limit 参数错误 : limit (行长度) 不能小于 0 !!!");
        }
        this.#limit = limit;
        return this;
    }

    getWhere() {
        return this.#where;
    }

    getOrderBys() {
        return this.#orderBys;
    }

    getOffset() {
        return this.#offset;
    }

    getLimit() {
        return this.#limit;
    }

    clearWhere() {
        this.#where = null;
        return this;
    }

    clearOrderBys() {
        this.#orderBys = [];
        return this;
    }

    clearOffset() {
        this.#offset = null;
        return this;
    }

    clearLimit() {
        this.#limit = null;
        return this;
    }

    orderBy(...orderBys) {
        this.#orderBys.push(...orderBys);
        return this;
    }


    asc(selector, ...controls) {
        let useExpression = checkUseExpression(controls);
        let o = new OrderBy(selector, ASC, useExpression);
        this.orderBy(o);
        return this;
    }


    desc(selector, ...controls) {
        let useExpression = checkUseExpression(controls);
        let o = new OrderBy(selector, DESC, useExpression);
        this.orderBy(o);
        return this;
    }

}

export {QueryImpl};
