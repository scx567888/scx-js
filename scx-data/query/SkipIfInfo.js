import {SKIP_IF_BLANK_STRING, SKIP_IF_EMPTY_LIST, SKIP_IF_EMPTY_STRING, SKIP_IF_NULL} from "./BuildControl.js";

class SkipIfInfo {
    skipIfNull;
    skipIfEmptyList;
    skipIfEmptyString;
    skipIfBlankString;

    constructor(skipIfNull, skipIfEmptyList, skipIfEmptyString, skipIfBlankString) {
        this.skipIfNull = skipIfNull;
        this.skipIfEmptyList = skipIfEmptyList;
        this.skipIfEmptyString = skipIfEmptyString;
        this.skipIfBlankString = skipIfBlankString;
    }

}

function ofSkipIfInfo(...controls) {
    let skipIfNull = false;
    let skipIfEmptyList = false;
    let skipIfEmptyString = false;
    let skipIfBlankString = false;
    for (let control of controls) {
        if (control === SKIP_IF_NULL) {
            skipIfNull = true;
        } else if (control === SKIP_IF_EMPTY_LIST) {
            skipIfEmptyList = true;
        } else if (control === SKIP_IF_EMPTY_STRING) {
            skipIfEmptyString = true;
        } else if (control === SKIP_IF_BLANK_STRING) {
            skipIfBlankString = true;
        }
    }

    return new SkipIfInfo(skipIfNull, skipIfEmptyList, skipIfEmptyString, skipIfBlankString);

}

export {
    SkipIfInfo,
    ofSkipIfInfo,
};
