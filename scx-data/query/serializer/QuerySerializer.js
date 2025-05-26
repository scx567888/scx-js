import {WhereClause} from "../WhereClause.js";
import {And} from "../And.js";
import {Or} from "../Or.js";
import {Not} from "../Not.js";
import {Condition} from "../Condition.js";

class QuerySerializer {

    toJson(query) {
        return JSON.stringify(this.serialize(query), null, 2);
    }

    serialize(query) {
        return this.serializeQuery(query);
    }

    serializeQuery(query) {
        return {
            "@type": "Query",
            where: this.serializeWhere(query.getWhere?.()),
            orderBys: this.serializeOrderBys(...(query.getOrderBys?.() ?? [])),
            offset: query.getOffset?.(),
            limit: query.getLimit?.(),
        };
    }

    serializeWhere(obj) {
        if (!obj) {
            return null;
        }

        if (obj instanceof WhereClause) {
            return this.serializeWhereClause(obj);
        }
        if (obj instanceof And) {
            return this.serializeAnd(obj);
        }
        if (obj instanceof Or) {
            return this.serializeOr(obj);
        }

        if (obj instanceof Not) {
            return this.serializeNot(obj);
        }

        if (obj instanceof Condition) {
            return this.serializeCondition(obj);
        }
        
        throw new Error(`Unknown Where type: ${obj?.type}`);

    }

    serializeWhereClause(w) {
        return {
            "@type": "WhereClause",
            expression: w.expression(),
            params: w.params(),
        };
    }

    serializeAnd(a) {
        return {
            "@type": "And",
            clauses: this.serializeWhereAll(a.clauses),
        };
    }

    serializeOr(o) {
        return {
            "@type": "Or",
            clauses: this.serializeWhereAll(o.clauses),
        };
    }

    serializeNot(n) {
        return {
            "@type": "Not",
            clause: this.serializeWhere(n.clause),
        };
    }

    serializeCondition(w) {
        return {
            "@type": "Condition",
            selector: w.selector(),
            conditionType: w.conditionType(),
            value1: w.value1(),
            value2: w.value2(),
            useExpression: w.useExpression(),
            useExpressionValue: w.useExpressionValue(),
            skipIfInfo: this.serializeSkipIfInfo(w.skipIfInfo()),
        };
    }

    serializeWhereAll(objs) {
        return objs.map(obj => this.serializeWhere(obj));
    }

    serializeOrderBys(...objs) {
        return objs.map(obj => this.serializeOrderBy(obj));
    }

    serializeOrderBy(orderBy) {
        return {
            "@type": "OrderBy",
            selector: orderBy.selector(),
            orderByType: orderBy.orderByType(),
            useExpression: orderBy.useExpression(),
        };
    }

    serializeSkipIfInfo(info) {
        if (!info) {
            return null;
        }
        return {
            "@type": "SkipIfInfo",
            skipIfNull: info.skipIfNull,
            skipIfEmptyList: info.skipIfEmptyList,
            skipIfEmptyString: info.skipIfEmptyString,
            skipIfBlankString: info.skipIfBlankString,
        };
    }

}

const QUERY_SERIALIZER = new QuerySerializer();

export {
    QuerySerializer,
    QUERY_SERIALIZER,
};
