import {WhereClause} from "../query/WhereClause.js";
import {And} from "../query/And.js";
import {Or} from "../query/Or.js";
import {Not} from "../query/Not.js";
import {Condition} from "../query/Condition.js";

function serializeQueryToJson(query) {
    return JSON.stringify(serializeQuery(query));
}

function serializeQuery(query) {
    return {
        "@type": "Query",
        where: serializeWhere(query.getWhere()),
        orderBys: serializeOrderBys(query.getOrderBys()),
        offset: query.getOffset(),
        limit: query.getLimit(),
    };
}

function serializeWhere(obj) {
    if (!obj) {
        return null;
    }

    if (obj instanceof WhereClause) {
        return serializeWhereClause(obj);
    }
    if (obj instanceof And) {
        return serializeAnd(obj);
    }
    if (obj instanceof Or) {
        return serializeOr(obj);
    }

    if (obj instanceof Not) {
        return serializeNot(obj);
    }

    if (obj instanceof Condition) {
        return serializeCondition(obj);
    }

    throw new Error(`Unknown Where type: ${obj}`);

}

function serializeWhereClause(w) {
    return {
        "@type": "WhereClause",
        expression: w.expression(),
        params: w.params(),
    };
}

function serializeAnd(a) {
    return {
        "@type": "And",
        clauses: serializeWhereAll(a.clauses()),
    };
}

function serializeOr(o) {
    return {
        "@type": "Or",
        clauses: serializeWhereAll(o.clauses()),
    };
}

function serializeNot(n) {
    return {
        "@type": "Not",
        clause: serializeWhere(n.clause()),
    };
}

function serializeCondition(w) {
    return {
        "@type": "Condition",
        selector: w.selector(),
        conditionType: w.conditionType(),
        value1: w.value1(),
        value2: w.value2(),
        useExpression: w.useExpression(),
        useExpressionValue: w.useExpressionValue(),
        skipIfInfo: serializeSkipIfInfo(w.skipIfInfo()),
    };
}

function serializeWhereAll(objs) {
    return objs.map(obj => serializeWhere(obj));
}

function serializeOrderBys(objs) {
    return objs.map(obj => serializeOrderBy(obj));
}

function serializeOrderBy(orderBy) {
    return {
        "@type": "OrderBy",
        selector: orderBy.selector(),
        orderByType: orderBy.orderByType(),
        useExpression: orderBy.useExpression(),
    };
}

function serializeSkipIfInfo(info) {
    return {
        "@type": "SkipIfInfo",
        skipIfNull: info.skipIfNull,
        skipIfEmptyList: info.skipIfEmptyList,
        skipIfEmptyString: info.skipIfEmptyString,
        skipIfBlankString: info.skipIfBlankString,
    };
}

export {
    serializeQueryToJson,
    serializeQuery,
};
