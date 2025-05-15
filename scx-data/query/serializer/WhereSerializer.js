import {Where} from "../Where.js";
import {isArray} from "@scx-js/scx-common";
import {Query} from "../Query.js";
import {WhereClause} from "../WhereClause.js";
import {And} from "../And.js";
import {Or} from "../Or.js";
import {Not} from "../Not.js";

class WhereSerializer {

    serialize(obj) {
        if (obj instanceof String) {
            return this.serializeString(obj);
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
        if (obj instanceof Where) {
            return this.serializeWhere(obj);
        }
        if (obj instanceof Query) {
            return this.serializeQuery(obj.getWhere());
        }
        if (isArray(obj)) {
            return this.serializeAll(obj);
        }
        return obj;
    }

    serializeString(str) {
        return str;
    }

    serializeWhereClause(w) {
        return {
            "@type": "WhereClause",
            "whereClause": w.whereClause(),
            "params": w.params(),
        };
    }

    serializeAnd(l) {
        return {
            "@type": "And",
            "clauses": this.serializeAll(l.clauses()),
        };
    }

    serializeOr(l) {
        return {
            "@type": "Or",
            "clauses": this.serializeAll(l.clauses()),
        };
    }

    serializeNot(l) {
        return {
            "@type": "Not",
            "clauses": this.serialize(l.clause()),
        };
    }

    serializeWhere(w) {
        return {
            "@type": "Where",
            "name": w.name(),
            "whereType": w.whereType(),
            "value1": w.value1(),
            "value2": w.value2(),
            "info": w.info(),
        };
    }

    serializeQuery(w) {
        return this.serializeAll(w.getWhere());
    }


    serializeAll(objs) {
        const arr = [];
        for (let i = 0; i < objs.length; i = i + 1) {
            arr[i] = this.serialize(objs[i]);
        }
        return arr;
    }

}

export {
    WhereSerializer,
};
