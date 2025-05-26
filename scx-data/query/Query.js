class Query {

    where(where) {
        return this;
    }

    orderBys(...orderBys) {
        return this;
    }

    offset(offset) {
        return this;
    }

    limit(limit) {
        return this;
    }

    getWhere() {
    }

    getOrderBys() {
    }

    getOffset() {
    }

    getLimit() {
    }

    clearWhere() {
        return this;
    }

    clearOrderBys() {
        return this;
    }

    clearOffset() {
        return this;
    }

    clearLimit() {
        return this;
    }

    orderBy(...orderBys) {
        return this;
    }

    asc(selector, ...controls) {
        return this;
    }

    desc(selector, ...controls) {
        return this;
    }

}

export {Query};
