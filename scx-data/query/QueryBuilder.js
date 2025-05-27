import {WhereClause} from "./WhereClause.js";
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
import {OrderBy} from "./OrderBy.js";
import {ASC, DESC} from "./OrderByType.js";
import {Not} from "./Not.js";
import {And} from "./And.js";
import {Or} from "./Or.js";
import {checkUseExpression, checkUseExpressionValue} from "./BuildControl.js";
import {ofSkipIfInfo} from "./SkipIfInfo.js";

function query(oldQuery) {
    return new QueryImpl(oldQuery);
}

function where(whereClauses) {
    return new QueryImpl().where(whereClauses);
}

function orderBys(...orderBys) {
    return new QueryImpl().orderBys(...orderBys);
}

function offset(offset) {
    return new QueryImpl().offset(offset);
}

function limit(limit) {
    return new QueryImpl().limit(limit);
}

function and(...clauses) {
    return new And().add(...clauses);
}

function or(...clauses) {
    return new Or().add(...clauses);
}

function not(clause) {
    return new Not(clause);
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

function orderBy(selector, orderByType, ...controls) {
    let useExpression = checkUseExpression(...controls);
    return new OrderBy(selector, orderByType, useExpression);
}

function whereClause(expression, ...params) {
    return new WhereClause(expression, ...params);
}

function asc(name, ...options) {
    return orderBy(name, ASC, ...options);
}

function desc(name, ...options) {
    return orderBy(name, DESC, ...options);
}

function eq(fieldName, value, ...options) {
    return condition(fieldName, EQ, value, ...options);
}

function ne(fieldName, value, ...options) {
    return condition(fieldName, NE, value, ...options);
}

function lt(fieldName, value, ...options) {
    return condition(fieldName, LT, value, ...options);
}

function lte(fieldName, value, ...options) {
    return condition(fieldName, LTE, value, ...options);
}

function gt(fieldName, value, ...options) {
    return condition(fieldName, GT, value, ...options);
}

function gte(fieldName, value, ...options) {
    return condition(fieldName, GTE, value, ...options);
}

function like(fieldName, value, ...options) {
    return condition(fieldName, LIKE, value, ...options);
}

function notLike(fieldName, value, ...options) {
    return condition(fieldName, NOT_LIKE, value, ...options);
}

function likeRegex(fieldName, value, ...options) {
    return condition(fieldName, LIKE_REGEX, value, ...options);
}

function notLikeRegex(fieldName, value, ...options) {
    return condition(fieldName, NOT_LIKE_REGEX, value, ...options);
}

function in_(fieldName, value, ...options) {
    return condition(fieldName, IN, value, ...options);
}

function notIn(fieldName, value, ...options) {
    return condition(fieldName, NOT_IN, value, ...options);
}

function between(fieldName, value1, value2, ...options) {
    return condition2(fieldName, BETWEEN, value1, value2, ...options);
}

function notBetween(fieldName, value1, value2, ...options) {
    return condition2(fieldName, NOT_BETWEEN, value1, value2, ...options);
}


export {
    query,
    where,
    orderBy,
    offset,
    limit,
    and,
    or,
    not,
    asc,
    desc,
    eq,
    ne,
    lt,
    lte,
    gt,
    gte,
    like,
    notLike,
    likeRegex,
    notLikeRegex,
    in_,
    notIn,
    between,
    notBetween,
    whereClause,
};
