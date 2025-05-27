import {Query} from "./Query.js";

class QueryLike extends Query {

    #query;

    query() {
        if (this.#query == null) {
            this.#query = this.toQuery();
        }
        return this.#query;
    }

    where(where) {
        this.query().where(where);
        return this;
    }

    orderBys(...orderBys) {
        this.query().orderBy(...orderBys);
        return this;
    }

    offset(limitOffset) {
        this.query().offset(limitOffset);
        return this;
    }

    limit(numberOfRows) {
        this.query().limit(numberOfRows);
        return this;
    }

    getWhere() {
        return this.query().getWhere();
    }

    getOrderBys() {
        return this.query().getOrderBys();
    }

    getOffset() {
        return this.query().getOffset();
    }

    getLimit() {
        return this.query().getLimit();
    }

    clearWhere() {
        this.query().clearWhere();
        return this;
    }

    clearOffset() {
        this.query().clearOffset();
        return this;
    }

    clearLimit() {
        this.query().clearLimit();
        return this;
    }

    orderBy(...orderByClauses) {
        this.query().orderBy(...orderByClauses);
        return this;
    }

    asc(selector, ...controls) {
        this.query().asc(selector, ...controls);
        return this;
    }

    desc(selector, ...controls) {
        this.query().desc(selector, ...controls);
        return this;
    }

    toQuery() {
    }

}

export {QueryLike};
