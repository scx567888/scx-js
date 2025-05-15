import {Junction} from "./Junction.js";
import {Or} from "./Or.js";

class And extends Junction{

    and(...clauses) {
        return this.add(new And().add(clauses));
    }

    or(...clauses) {
        return this.add(new Or().add(clauses));
    }
    
}

export {And}
