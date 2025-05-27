class BuildControl {

    #value;

    constructor(value) {
        this.#value = value;
    }

}

const SKIP_IF_NULL = new BuildControl("SKIP_IF_NULL");
const SKIP_IF_EMPTY_LIST = new BuildControl("SKIP_IF_EMPTY_LIST");
const SKIP_IF_EMPTY_STRING = new BuildControl("SKIP_IF_EMPTY_STRING");
const SKIP_IF_BLANK_STRING = new BuildControl("SKIP_IF_BLANK_STRING");
const USE_EXPRESSION = new BuildControl("USE_EXPRESSION");
const USE_EXPRESSION_VALUE = new BuildControl("USE_EXPRESSION_VALUE");


function checkUseExpression(...controls) {
    for (let control of controls) {
        if (control === USE_EXPRESSION) {
            return true;
        }
    }
    return false;
}

function checkUseExpressionValue(...controls) {
    for (let control of controls) {
        if (control === USE_EXPRESSION_VALUE) {
            return true;
        }
    }
    return false;
}

export {
    BuildControl,
    SKIP_IF_NULL,
    SKIP_IF_EMPTY_LIST,
    SKIP_IF_BLANK_STRING,
    SKIP_IF_EMPTY_STRING,
    USE_EXPRESSION,
    USE_EXPRESSION_VALUE,
    checkUseExpression,
    checkUseExpressionValue,
};
