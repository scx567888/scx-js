import {copyArray, isFunction, isNull, isObject, notNull} from "@scx-js/scx-common";
import {useScxReq} from "@scx-js/scx-http";

function myEqual(value1, value2) {
    return String(value1) === String(value2);
}

function myIncludes(array, value) {
    return array.some(item => myEqual(item, value));
}

class EasyOption {

    /**
     * options
     * @type Array
     */
    options = [];

    /**
     *
     * @type {string|Function}
     */
    labelKey;

    /**
     *
     * @type {string|Function}
     */
    valueKey;

    /**
     * 构建 Url
     */
    buildUrl;

    /**
     * 构建 Url 参数
     */
    buildUrlParams;

    /**
     * 默认选项
     */
    defaultOptions;

    /**
     * req 对象
     */
    req;

    /**
     *
     * @param labelKey {string|Function}
     * @param valueKey {string|Function}
     * @param defaultOptions
     * @param buildUrl
     * @param buildUrlParams
     */
    constructor({labelKey = "label", valueKey = "value", defaultOptions = [], buildUrl, buildUrlParams = {}} = {}) {
        this.labelKey = labelKey;
        this.valueKey = valueKey;
        this.defaultOptions = defaultOptions;
        this.buildUrl = buildUrl;
        this.buildUrlParams = buildUrlParams;
        this.req = useScxReq();
        //如果只是普通的 options 我们直接刷新
        if (isNull(this.buildUrl)) {
            this.refresh();
        }
    }

    async refresh() {
        this.options = []; // 清空原数据

        if (this.defaultOptions.length > 0) {
            if (isObject(this.defaultOptions[0])) {
                this.options = copyArray(this.defaultOptions); // 复制一下原数组防止产生引用影响
            } else {
                console.warn("检测到 options 元素 不为对象已自动转换 !!! ");
                this.options = this.defaultOptions.map(o => {
                    const s = {};
                    s[this.labelKey] = o;
                    s[this.valueKey] = o;
                    return s;
                });
            }
        }
        if (notNull(this.buildUrl)) {
            const data = await this.req.post(this.buildUrl, this.buildUrlParams);
            this.options.push(...data.items);
        }
        return this;
    }

    getLabelByValue(value) {
        if (Array.isArray(value)) {
            const options = this.getByValue(value).map(o => this.labelSupplier(o));
            return options.length > 0 ? options.join(", ") : "-";
        } else {
            const option = this.getByValue(value);
            return option != null ? this.labelSupplier(option) : "-";
        }
    }

    getByValue(value) {
        if (Array.isArray(value)) {
            return this.options.filter(c => myIncludes(value, this.valueSupplier(c)));
        } else {
            return this.options.find(c => myEqual(this.valueSupplier(c), value));
        }
    }

    labelSupplier(c) {
        if (isFunction(this.labelKey)) {
            return this.labelKey(c);
        } else {
            return c[this.labelKey];
        }
    }

    valueSupplier(c) {
        if (isFunction(this.valueKey)) {
            return this.valueKey(c);
        } else {
            return c[this.valueKey];
        }
    }

}

export {EasyOption};
