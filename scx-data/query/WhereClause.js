import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class WhereClause extends QueryLike {

    #expression;
    #params;

    constructor(expression, params) {
        super();
        this.#expression = expression;
        this.#params = params;
    }

    isEmpty() {
        return (this.#expression == null || this.#expression.isEmpty()) && (this.#params == null || this.#params.length === 0);
    }

    expression() {
        return this.#expression;
    }

    params() {
        return this.#params;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {WhereClause};
