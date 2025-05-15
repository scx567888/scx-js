import {Junction} from "./Junction.js";
import {And} from "./And.js";

class Or extends Junction {

    // 因为 js 不允许 循环依赖 所以 这两个方法迁移到子类
    and(...clauses) {
        return this.add(new And().add(clauses));
    }

    or(...clauses) {
        return this.add(new Or().add(clauses));
    }

}

export {Or};
