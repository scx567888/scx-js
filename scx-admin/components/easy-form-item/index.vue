<template>
    <el-form-item :label="easyLabel" :prop="easyProp" :rules="easyRules">
        <slot/>
    </el-form-item>
</template>

<script>
import {computed} from "vue";
import {notBlank, randomUUID} from "@scx-js/scx-common";
import {checkIDCard, checkPhoneNumber, useCrudContext,} from "../../index.js";

export default {
    name: "easy-form-item",
    props: {
        //是否使用标注在 easy-form-item 上的 model
        //默认使用 el-form 上的
        useModel: {
            type: Boolean,
            default: false
        },
        //若代校验数据不属于 el-form :model 中的数据
        //则可以直接赋值给 model
        model: {
            type: [String, Number, Array, Object],
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: String,
            default: "blur"
        },
        label: {
            type: String,
            default: null
        },
        prop: {
            type: String,
            required: false,
            default: null
        },
        unique: {
            type: Boolean,
            default: false
        },
        checkIDCard: {
            type: Boolean,
            default: false
        },
        checkPhoneNumber: {
            type: Boolean,
            default: false
        },
        validator: {
            default: null
        }
    },
    setup(props, context) {

        const crudContext = useCrudContext();

        const easyProp = computed(() => props.prop ? props.prop : randomUUID());

        const easyLabel = computed(() => {
            if (props.label) {
                const l = props.label.trim();
                return l.endsWith(":") ? l : l + " :";
            } else {
                return props.label;
            }
        });

        const fieldLabel = computed(() => props.label ? props.label : props.prop);

        /**
         * 获取校验值
         */
        function getFinalValue(v) {
            return props.useModel ? props.model : v;
        }

        function getRequiredRule() {
            return {
                validator: (a, b, callback) => {
                    if (notBlank(getFinalValue(b))) {
                        callback();
                    } else {
                        callback(new Error());
                    }
                },
                required: true,
                message: fieldLabel.value + "不能为空 !!!",
                trigger: props.trigger
            };
        }

        function getUniqueRule() {
            return {
                validator: (a, b, c) => crudContext.checkUnique(a, getFinalValue(b), c, fieldLabel.value),
                required: false,
                trigger: props.trigger
            };
        }

        function getCheckPhoneNumberRule() {
            return {
                validator: (a, b, c) => checkPhoneNumber(a, getFinalValue(b), c, fieldLabel.value),
                required: false,
                trigger: props.trigger
            };
        }

        function getCheckIDCardRule() {
            return {
                validator: (a, b, c) => checkIDCard(a, getFinalValue(b), c, fieldLabel.value),
                required: false,
                trigger: props.trigger
            };
        }

        function getValidatorRule() {
            const vList = Array.isArray(props.validator) ? props.validator : [props.validator];
            return vList.filter(v => v instanceof Function).map(v => {
                return {
                    validator: (a, b, c) => v(a, getFinalValue(b), c, fieldLabel.value),
                    trigger: props.trigger
                };
            });
        }

        const easyRules = computed(() => {
            const tempRules = [];
            if (props.required) {
                tempRules.push(getRequiredRule());
            }
            if (props.unique) {
                if (crudContext == null) {
                    console.error("未找到能够注入的 crudContext 对象, 无法实现 unique");
                } else {
                    tempRules.push(getUniqueRule());
                }
            }
            if (props.checkPhoneNumber) {
                tempRules.push(getCheckPhoneNumberRule());
            }
            if (props.checkIDCard) {
                tempRules.push(getCheckIDCardRule());
            }
            if (props.validator) {
                tempRules.push(...getValidatorRule());
            }
            return tempRules;
        });

        return {
            easyProp,
            easyLabel,
            easyRules
        };
    }
};
</script>

<style scoped>

</style>
