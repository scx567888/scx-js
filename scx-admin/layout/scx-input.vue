<template>
    <div class="scx-input">
        <scx-icon v-if="icon" :icon="icon"/>
        <input v-model="m" :placeholder="placeholder" type="text"/>
        <scx-icon v-show="m!==''" icon="outlined-close" @click="m=''"/>
    </div>
</template>

<script>
import {computed} from "vue";

export default {
    name: "scx-input",
    props: {
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        placeholder: {
            type: String,
            default: "输入名称搜索",
        },
        icon: {
            type: String,
            default: null
        }
    },
    setup(props, context) {

        const m = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                context.emit("update:modelValue", value);
            }
        });

        return {m};
    }
};
</script>
<style>
.scx-input {
    display: flex;
    justify-content: space-between;
    align-self: center;
    align-items: center;
    /* 32px 是当前这个元素的高度 默认被内部的 input 撑起来的高度*/
    border-radius: calc(32px / 2);
    background: var(--scx-input_bg);
    box-shadow: var(--scx-input_box-shadow);
    transition: all 100ms cubic-bezier(0.23, 1, 0.32, 1);
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
}

.scx-input > input {
    width: 100%;
    outline: none;
    font-size: 15px;
    height: 30px;
    border: 0;
    background-color: transparent;
    margin-left: 10px;
    margin-right: 10px;
}

.scx-input > input::placeholder {
    color: var(--scx-text-placeholder-color);
}

.scx-input > svg {
    width: 20px;
    flex-shrink: 0;
    cursor: pointer;
}

.scx-input:focus-within {
    box-shadow: var(--scx-input-hover_box-shadow);
}
</style>
