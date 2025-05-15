import {WhereClause} from "./WhereClause.js";
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
import {OrderBy} from "./OrderBy.js";
import {ASC, DESC} from "./OrderByType.js";
import {Not} from "./Not.js";
import {And} from "./And.js";
import {Or} from "./Or.js";

function query(oldQuery) {
    return new QueryImpl(oldQuery);
}

function where(whereClauses) {
    return new QueryImpl().where(whereClauses);
}

function groupBy(...groupByClauses) {
    return new QueryImpl().groupBy(...groupByClauses);
}

function orderBy(...orderByClauses) {
    return new QueryImpl().orderBy(...orderByClauses);
}

function offset(limitOffset) {
    return new QueryImpl().offset(limitOffset);
}

function limit(numberOfRows) {
    return new QueryImpl().limit(numberOfRows);
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

function asc(name, ...options) {
    return new OrderBy(name, ASC, ...options);
}

function desc(name, ...options) {
    return new OrderBy(name, DESC, ...options);
}

function eq(fieldName, value, ...options) {
    return new Where(fieldName, EQ, value, null, ...options);
}

function ne(fieldName, value, ...options) {
    return new Where(fieldName, NE, value, null, ...options);
}

function lt(fieldName, value, ...options) {
    return new Where(fieldName, LT, value, null, ...options);
}

function lte(fieldName, value, ...options) {
    return new Where(fieldName, LTE, value, null, ...options);
}

function gt(fieldName, value, ...options) {
    return new Where(fieldName, GT, value, null, ...options);
}

function gte(fieldName, value, ...options) {
    return new Where(fieldName, GTE, value, null, ...options);
}

function like(fieldName, value, ...options) {
    return new Where(fieldName, LIKE, value, null, ...options);
}

function notLike(fieldName, value, ...options) {
    return new Where(fieldName, NOT_LIKE, value, null, ...options);
}

function likeRegex(fieldName, value, ...options) {
    return new Where(fieldName, LIKE_REGEX, value, null, ...options);
}

function notLikeRegex(fieldName, value, ...options) {
    return new Where(fieldName, NOT_LIKE_REGEX, value, null, ...options);
}

function in_(fieldName, value, ...options) {
    return new Where(fieldName, IN, value, null, ...options);
}

function notIn(fieldName, value, ...options) {
    return new Where(fieldName, NOT_IN, value, null, ...options);
}

function between(fieldName, value1, value2, ...options) {
    return new Where(fieldName, BETWEEN, value1, value2, ...options);
}

function notBetween(fieldName, value1, value2, ...options) {
    return new Where(fieldName, NOT_BETWEEN, value1, value2, ...options);
}

function jsonContains(fieldName, value, ...options) {
    return new Where(fieldName, JSON_CONTAINS, value, null, ...options);
}

function jsonOverlaps(fieldName, value, ...options) {
    return new Where(fieldName, JSON_OVERLAPS, value, null, ...options);
}

function whereClause(whereClause, params) {
    return new WhereClause(whereClause, params);
}


export {
    query,
    where,
    groupBy,
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
    jsonContains,
    whereClause,
};
