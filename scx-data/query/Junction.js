import {QueryLike} from "./QueryLike.js";
import {
    BETWEEN,
    EQ,
    GT,
    GTE,
    IN,
    LIKE,
    LIKE_REGEX,
    LT,
    LTE,
    NE,
    NOT_BETWEEN,
    NOT_IN,
    NOT_LIKE,
    NOT_LIKE_REGEX,
} from "./ConditionType.js";
import {Condition} from "./Condition.js";
import {QueryImpl} from "./QueryImpl.js";
import {Not} from "./Not.js";
import {WhereClause} from "./WhereClause.js";

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
        return this.add(new Condition(fieldName, EQ, value, null, ...options));
    }

    ne(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, NE, value, null, ...options));
    }

    lt(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, LT, value, null, ...options));
    }

    lte(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, LTE, value, null, ...options));
    }

    gt(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, GT, value, null, ...options));
    }

    gte(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, GTE, value, null, ...options));
    }

    like(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, LIKE, value, null, ...options));
    }

    notLike(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, NOT_LIKE, value, null, ...options));
    }

    likeRegex(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, LIKE_REGEX, value, null, ...options));
    }

    notLikeRegex(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, NOT_LIKE_REGEX, value, null, ...options));
    }

    in(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, IN, value, null, ...options));
    }

    notIn(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, NOT_IN, value, null, ...options));
    }

    between(fieldName, value1, value2, ...options) {
        return this.add(new Condition(fieldName, BETWEEN, value1, value2, ...options));
    }

    notBetween(fieldName, value1, value2, ...options) {
        return this.add(new Condition(fieldName, NOT_BETWEEN, value1, value2, ...options));
    }

    jsonContains(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, JSON_CONTAINS, value, null, ...options));
    }

    jsonOverlaps(fieldName, value, ...options) {
        return this.add(new Condition(fieldName, JSON_OVERLAPS, value, null, ...options));
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

    whereClause(expression, ...params) {
        return this.add(new WhereClause(expression, params));
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {
    Junction,
};
