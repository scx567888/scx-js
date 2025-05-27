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
import {checkUseExpression, checkUseExpressionValue} from "./BuildControl.js";
import {ofSkipIfInfo} from "./SkipIfInfo.js";

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
        this.#clauses.push(...logicCauses);
        return this;
    }

    clear() {
        this.#clauses = [];
        return this;
    }

    eq(fieldName, value, ...options) {
        return this.add(condition(fieldName, EQ, value,  ...options));
    }

    ne(fieldName, value, ...options) {
        return this.add(condition(fieldName, NE, value,  ...options));
    }

    lt(fieldName, value, ...options) {
        return this.add(condition(fieldName, LT, value,  ...options));
    }

    lte(fieldName, value, ...options) {
        return this.add(condition(fieldName, LTE, value,  ...options));
    }

    gt(fieldName, value, ...options) {
        return this.add(condition(fieldName, GT, value,  ...options));
    }

    gte(fieldName, value, ...options) {
        return this.add(condition(fieldName, GTE, value,  ...options));
    }

    like(fieldName, value, ...options) {
        return this.add(condition(fieldName, LIKE, value,  ...options));
    }

    notLike(fieldName, value, ...options) {
        return this.add(condition(fieldName, NOT_LIKE, value,  ...options));
    }

    likeRegex(fieldName, value, ...options) {
        return this.add(condition(fieldName, LIKE_REGEX, value,  ...options));
    }

    notLikeRegex(fieldName, value, ...options) {
        return this.add(condition(fieldName, NOT_LIKE_REGEX, value,  ...options));
    }

    in(fieldName, value, ...options) {
        return this.add(condition(fieldName, IN, value,  ...options));
    }

    notIn(fieldName, value, ...options) {
        return this.add(condition(fieldName, NOT_IN, value,  ...options));
    }

    between(fieldName, value1, value2, ...options) {
        return this.add(condition2(fieldName, BETWEEN, value1, value2, ...options));
    }

    notBetween(fieldName, value1, value2, ...options) {
        return this.add(condition2(fieldName, NOT_BETWEEN, value1, value2, ...options));
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


function condition(fieldName, conditionType, value, ...controls) {
    let useExpression = checkUseExpression(...controls);
    let useExpressionValue = checkUseExpressionValue(...controls);
    let skipIfInfo = ofSkipIfInfo(...controls);
    return new Condition(fieldName, conditionType, value, null, useExpression, useExpressionValue, skipIfInfo);
}

function condition2(fieldName, conditionType, value1, value2, ...controls) {
    let useExpression = checkUseExpression(...controls);
    let useExpressionValue = checkUseExpressionValue(...controls);
    let skipIfInfo = ofSkipIfInfo(...controls);
    return new Condition(fieldName, conditionType, value1, value2, useExpression, useExpressionValue, skipIfInfo);
}

export {
    Junction,
};
