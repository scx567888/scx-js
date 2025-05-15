class Query {

    where(where) {
        return this;
    }

    groupBy(...groupByClauses) {
        return this;
    }

    orderBy(...orderByClauses) {
        return this;
    }

    offset(limitOffset) {
        return this;
    }

    limit(numberOfRows) {
        return this;
    }

    getWhere() {
    }

    getGroupBy() {
    }

    getOrderBy() {
    }

    getOffset() {
    }

    getLimit() {
    }

    clearWhere() {
        return this;
    }

    clearGroupBy() {
        return this;
    }

    clearOrderBy() {
        return this;
    }

    clearOffset() {
        return this;
    }

    clearLimit() {
        return this;
    }

    addGroupBy(...groupByClauses) {
        return this;
    }

    addOrderBy(...orderByClauses) {
        return this;
    }

    removeGroupByIf(filter) {
        return this;
    }

    removeOrderByIf(filter) {
        return this;
    }

}

export {Query};
