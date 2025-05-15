import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class Not extends QueryLike {

    #clause;

    constructor(clause) {
        super();
        this.#clause = clause;
    }

    clause() {
        return this.clause;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }
}

export {Not};
