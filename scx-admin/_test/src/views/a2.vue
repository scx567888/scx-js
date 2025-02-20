<template>
    <crud>

        <template #header-left>
            <crud-add-button/>
        </template>

        <template #header-right>
            <el-input placeholder="name" v-model="crudContext.where.name" style="width: 100px"/>
            <crud-search-button/>
            <crud-reset-button/>
        </template>

        <template #main>
            <crud-table>
                <el-table-column label="名称" sortable prop="name"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="{row}">
                        <crud-table-edit-button :data="row"/>
                        <crud-table-delete-button :data="row"/>
                    </template>
                </el-table-column>
            </crud-table>
        </template>

        <template #footer>
            <crud-pagination/>
        </template>

        <crud-edit-dialog>
            <crud-edit-form>
                <el-input v-model="crudContext.temp.name"/>
            </crud-edit-form>
        </crud-edit-dialog>

    </crud>
</template>
<script setup>
import {CrudContext, installCrudContext} from "../../../scx/index.js";
import {onActivated} from "vue";
import {ScxCrud} from "@scx-js/scx-app-x";
import {randomUUID} from "@scx-js/scx-common";
import CrudPagination from "../../../components/crud/crud-pagination.vue";

class MyCrud extends ScxCrud {

    data = [];

    list(crudListParam) {
        return new Promise((resolve, reject) => {
            resolve({items: [...this.data], total: this.data.length})
        });
    }

    info(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.filter(c => c.id === id)[0]);
        })
    }

    add(saveModel) {
        return new Promise((resolve, reject) => {
            saveModel.id = randomUUID();
            this.data.push(saveModel)
            resolve(saveModel)
        });
    }

    update(crudUpdateParam) {

    }

    delete(crudListParam) {

    }

    checkUnique(fieldName, value, id = null) {

    }

    count(crudListParam) {
        return new Promise((resolve, reject) => {
            resolve(this.data.length);
        });
    }

}

const crudContext = installCrudContext(new CrudContext(
        {
            scxCrud: new MyCrud(),
            defaultTemp: {
                name: "name"
            },
            defaultWhere: {
                name: ""
            }
        }
));

onActivated(c => {
    crudContext.getList();
})

</script>

<style scoped>

</style>
