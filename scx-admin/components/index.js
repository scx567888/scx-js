//以下为组件
import CrudAddButton from "./crud/crud-add-button.vue";
import CrudBatchDelete from "./crud/crud-batch-delete.vue";
import CrudEditDialog from "./crud/crud-edit-dialog.vue";
import CrudEditForm from "./crud/crud-edit-form.vue";
import CrudFormFooter from "./crud/crud-form-footer.vue";
import CrudPagination from "./crud/crud-pagination.vue";
import CrudResetButton from "./crud/crud-reset-button.vue";
import CrudSearchButton from "./crud/crud-search-button.vue";
import CrudTable from "./crud/crud-table.vue";
import CrudTableDeleteButton from "./crud/crud-table-delete-button.vue";
import CrudTableEditButton from "./crud/crud-table-edit-button.vue";
import Crud from "./crud/index.vue";
//组件过重 暂时不引入 如需使用请单独引入
// import EasyCkeditor from "./easy-ckeditor/index.vue";
// import EasyCkeditorLazy from "./easy-ckeditor/easy-ckeditor-lazy.vue";
import EasyFormItem from "./easy-form-item/index.vue";
import EasyImage from "./easy-image/index.vue";
//组件过重 暂时不引入 如需使用请单独引入
// import EasyMonacoEditor from "./easy-monaco-editor/index.vue";
import EasySelect from "./easy-select/index.vue";
import EasyUpload from "./easy-upload/index.vue";
import EasyUploadList from "./easy-upload-list/index.vue";
import LeftTree from "./left-tree/index.vue";
import ScxContainer from "./scx-container/index.vue";
import UserProfile from "./user-profile/index.vue";


const components = [
    CrudAddButton,
    CrudBatchDelete,
    CrudEditDialog,
    CrudEditForm,
    CrudFormFooter,
    CrudPagination,
    CrudResetButton,
    CrudSearchButton,
    CrudTable,
    CrudTableDeleteButton,
    CrudTableEditButton,
    Crud,
    EasyFormItem,
    EasyImage,
    EasySelect,
    EasyUpload,
    EasyUploadList,
    LeftTree,
    ScxContainer,
    UserProfile,
];

const directives = [];

const ScxAdminComponent = {

    install(app) {
        //安装组件
        components.forEach(c => {
            app.component(c.name, c);
            console.log(c);
        });
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
    },
};

export {
    ScxAdminComponent,
};
