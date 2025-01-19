import {HttpFieldName} from "./HttpFieldName.js";
import {MediaType} from "./MediaType.js";

class ScxFetchResponseType {

    static ARRAY_BUFFER = "arrayBuffer";
    static BLOB = "blob";
    static FORM_DATA = "formData";
    static JSON = "json";
    static TEXT = "text";
    static AUTO = "auto";

    /**
     * 获取 header 中的 CONTENT_TYPE 判断相应的类型
     * @param headers
     * @param defaultType 优先的返回值
     */
    static getByHeaders(headers, defaultType) {
        if (defaultType && defaultType !== ScxFetchResponseType.AUTO) {
            return defaultType;
        }
        let contentType = headers.get(HttpFieldName.CONTENT_TYPE);
        if (contentType == null) {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
        contentType = contentType.toLowerCase();
        if (contentType.startsWith(MediaType.APPLICATION_JSON)) {
            return ScxFetchResponseType.JSON;
        } else if (contentType.startsWith(MediaType.TEXT_ANY) || contentType.startsWith(MediaType.APPLICATION_XML)) {
            return ScxFetchResponseType.TEXT;
        } else if (contentType.startsWith(MediaType.MULTIPART_FORM_DATA)) {
            return ScxFetchResponseType.FORM_DATA;
        } else {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
    }

}

export {
    ScxFetchResponseType,
};
