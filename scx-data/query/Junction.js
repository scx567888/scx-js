import {QueryLike} from "./QueryLike.js";
import {
    BETWEEN,
    EQ,
    GT,
    GTE,
    IN,
    JSON_CONTAINS,
    JSON_OVERLAPS,
    LIKE,
    LIKE_REGEX,
    LT,
    LTE,
    NE,
    NOT_BETWEEN,
    NOT_IN,
    NOT_LIKE,
    NOT_LIKE_REGEX,
} from "./WhereType.js";
import {Where} from "./Where.js";
import {QueryImpl} from "./QueryImpl.js";
import {Not} from "./Not.js";

class Junction extends QueryLike {

    #clauses;

    constructor() {
        super();
        this.#clauses = [];
    }

    clauses() {
        return this.#clauses;
    }

    add(...logicCauses) {
        for (let logicCause of logicCauses) {
            if (logicCause == null) {
                continue;
            }
            if (Array.isArray(logicCause)) {
                this.add(...logicCause);
                continue;
            }
            this.#clauses.push(logicCause);
        }
        return this;
    }

    clear() {
        this.#clauses = [];
        return this;
    }

    eq(fieldName, value, ...options) {
        return this.add(new Where(fieldName, EQ, value, null, ...options));
    }

    ne(fieldName, value, ...options) {
        return this.add(new Where(fieldName, NE, value, null, ...options));
    }

    lt(fieldName, value, ...options) {
        return this.add(new Where(fieldName, LT, value, null, ...options));
    }

    lte(fieldName, value, ...options) {
        return this.add(new Where(fieldName, LTE, value, null, ...options));
    }

    gt(fieldName, value, ...options) {
        return this.add(new Where(fieldName, GT, value, null, ...options));
    }

    gte(fieldName, value, ...options) {
        return this.add(new Where(fieldName, GTE, value, null, ...options));
    }

    like(fieldName, value, ...options) {
        return this.add(new Where(fieldName, LIKE, value, null, ...options));
    }

    notLike(fieldName, value, ...options) {
        return this.add(new Where(fieldName, NOT_LIKE, value, null, ...options));
    }

    likeRegex(fieldName, value, ...options) {
        return this.add(new Where(fieldName, LIKE_REGEX, value, null, ...options));
    }

    notLikeRegex(fieldName, value, ...options) {
        return this.add(new Where(fieldName, NOT_LIKE_REGEX, value, null, ...options));
    }

    in(fieldName, value, ...options) {
        return this.add(new Where(fieldName, IN, value, null, ...options));
    }

    notIn(fieldName, value, ...options) {
        return this.add(new Where(fieldName, NOT_IN, value, null, ...options));
    }

    between(fieldName, value1, value2, ...options) {
        return this.add(new Where(fieldName, BETWEEN, value1, value2, ...options));
    }

    notBetween(fieldName, value1, value2, ...options) {
        return this.add(new Where(fieldName, NOT_BETWEEN, value1, value2, ...options));
    }

    jsonContains(fieldName, value, ...options) {
        return this.add(new Where(fieldName, JSON_CONTAINS, value, null, ...options));
    }

    jsonOverlaps(fieldName, value, ...options) {
        return this.add(new Where(fieldName, JSON_OVERLAPS, value, null, ...options));
    }

    and(...clauses) {
        // 因为 js 不允许 循环依赖 所以 这个方法迁移到子类实现
    }

    or(...clauses) {
        // 因为 js 不允许 循环依赖 所以 这个方法迁移到子类实现
    }

    not(clause) {
        return this.add(new Not(clause));
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {
    Junction,
};
