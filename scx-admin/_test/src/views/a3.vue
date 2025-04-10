<template>
    <div>
        <easy-monaco-editor v-model="text"/>
        <easy-monaco-editor v-model="text"/>
    </div>
</template>
<script setup>
import {ref} from "vue";
import EasyMonacoEditor from "../../../components/easy-monaco-editor/index.vue";

const text=ref(`
function main(){
    console.log(123);
}
`);

</script>


<style scoped>

</style>
