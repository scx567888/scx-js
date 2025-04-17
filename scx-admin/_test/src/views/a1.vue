<template>
    <div>
        <easy-ckeditor v-model="text"/>
        <easy-ckeditor v-model="text"/>
    </div>
</template>
<script setup>
import EasyCkeditor from "../../../components/easy-ckeditor/index.vue";
import {ref} from "vue";

const text = ref("一些文本");

</script>


<style scoped>

</style>
