import {
    JsonVOError,
    ScxReq,
    useScxReq,
} from "@scx-js/scx-http";
import {CRUDListParam,ScxCrud} from "@scx-js/scx-app-x"
import {focusFirstErrorElement} from "../util/index.js";
import {useScxUserInfo} from "./scx-auth-info.js";
import {ElMessage, ElNotification} from "element-plus";
import {inject, isReactive, nextTick, provide, reactive} from "vue";
import {OrderBy, and, like, query, eq, in_} from "@scx-js/scx-data";
import {deepCopy,notBlank} from "@scx-js/scx-common";

/**
 *
 * @type {string}
 */
const crudContextKey = "crud-context";

/**
 *  crud 上下文 , 方便操作进行简单的页面 crud
 */
class CrudContext {

    /**
     *  req 对象 用于调用 api
     *  @type {ScxReq}
     */
    req = null;

    /**
     * 用于判断后台是否允许真实删除
     * @type {ScxAuthInfo}
     */
    userInfo = null;

    /**
     * @type {ScxCrud}
     */
    scxCrud;

    /**
     *  表格的 ref 用来调用 el-table 表格的相关操作 如清除多选数据
     */
    scxTableRef = null;

    /**
     * 添加或修改 Form 的 ref , 用来调用 el-form 相关的操作 如校验表单中数据是否合法
     */
    scxCreateAndUpdateFormRef = null;

    /**
     * 默认 where
     */
    defaultWhere = {};

    /**
     * 默认 临时对象
     */
    defaultTemp = {};

    /**
     * [orderBy pagination selectFilterBody where] 会在 getQueryParam 方法中组合为 listApi 需要的最终查询参数对象
     *
     * 排序字段 model (注意: 虽然 list api 支持多排序字段 但目前前台还是使用单排序字段 即每次查询只支持一列排序)
     * @type {{fieldName: string, sortType: string}}
     */
    orderBy = {fieldName: "id", sortType: "DESC"};

    /**
     * 分页字段 model 和 orderBy 功能类似 (注意 : listApi 的分页起始 为 0 ,前台 ui 这里为 1 ,所以在转换为 listApi 查询对象的时候需要注意 -1 )
     * @type {{pageSize: number, currentPage: number}}
     */
    pagination = {currentPage: 1, pageSize: 10};

    /**
     * 查询列过滤条件 对象 一般我们将其设置为 null 即查询所有字段
     */
    selectFilterBody = null;

    /**
     * 查询参数绑定 model 这里默认都是以 like 的方式发送到后台 具体如有变化请自行继承 CrudContext 并重写 getQueryParam 方法
     * @type {{}}
     */
    where = {};

    /**
     * 默认 不需要更新的字段名称
     * @type Array
     */
    needUpdateFieldNames = null;

    /**
     * 表单绑定的临时操作对象 很重要!!!
     */
    temp = {};

    /**
     * 当前页面类型 是处于添加还是处于修改  取值 [create, update]
     * @type {string}
     */
    pageFlag = "";

    /**
     * 表格列表数据
     * @type {[]}
     */
    tableBody = [];

    /**
     * 表格加载状态
     * @type {boolean}
     */
    tableLoading = true;

    /**
     * 总条数
     * @type {number}
     */
    total = 0; // 总条数

    /**
     * 编辑弹窗
     * @type {{visible: boolean, confirmButtonLoading: boolean}}
     */
    editDialog = {

        /**
         * 添加或修改页面的 确认按钮是否处于 loading 状态 防止重复点击 造成多条数据添加
         */
        confirmButtonLoading: false,

        /**
         * 添加和删除的的 dialog 显示状态
         */
        visible: false,

    };

    /**
     * 保存多选项的对象
     * @type {[]}
     */
    multipleSelection = [];

    /**
     *
     * @param baseCrudApi a
     * @param scxTableRef a
     * @param defaultTemp a
     * @param defaultWhere a
     */
    constructor({
                    baseCrudApi,
                    defaultTemp = {},
                    defaultWhere = {},
                } = {}) {
        this.req = useScxReq();
        this.userInfo = useScxUserInfo();
        this.defaultTemp = defaultTemp;
        this.defaultWhere = defaultWhere;
        this.scxCrud = new ScxCrud(this.req, baseCrudApi);

        //重置全部对象
        this.resetPagination();
        this.resetOrderBy();
        this.resetSelectFilterBody();
        this.resetWhere();
        this.resetTemp();
    }

    /**
     * 删除单条数据实现
     * @param row
     */
    deleteOne(row) {
        if (!row.id) {
            ElNotification({title: "待删除数据 id 不能为空 !!!", type: "warning", duration: 5000});
            return;
        }
        let msg = `已成功删除 : ${this.getMainInfo(row)}`;// 删除消息
        let en = null; // 弹出框对象
        //这里针对后台是否采用墓碑机制给予用户删除的两种不同交互策略
        this.scxCrud.delete({query:eq("id",row.id)}).then(data => {
            en = ElNotification({
                title: "删除成功 !!!",
                message: msg,
                type: "success",
                dangerouslyUseHTMLString: true,
                duration: 5000,
            });
            this.tableBody = this.tableBody.filter(b => b.id !== row.id);
            this.total = this.total - 1;
        }).catch(e => ElNotification({title: "删除失败 !!!", message: e, type: "error", duration: 5000}));
    }

    batchDelete() {
        const deleteIDs = this.multipleSelection.map(d => d.id);
        //如果 数据为空 显示提示框
        if (deleteIDs.length === 0) {
            ElNotification({
                title: "未选中任何数据!!!", type: "warning", duration: 5000,
            });
            return;
        }
        //数据校验全部没问题 可以进行 批量删除
        this.scxCrud.delete({query:in_("id",deleteIDs)})
                .then(deletedCount => {
                    ElNotification({
                        title: "已删除全部选中数据 , 共" + deletedCount + "条 !", type: "success", duration: 5000,
                    });
                    //清空多选数据
                    this.scxTableRef.clearSelection();
                    if (deletedCount >= this.tableBody.length) {
                        this.pagination.currentPage = 1;
                    }
                    this.getList();
                })
                .catch(e => ElNotification({
                    title: "批量删除失败 !!!", type: "error", duration: 5000,
                }));
    }

    getList() {
        //开启表格加载动画
        this.tableLoading = true;
        this.scxCrud.list(this.getQueryParam()).then(data => {
            this.tableBody = data.items;
            this.total = data.total;
        }).catch(e => {
            if (e instanceof JsonVOError) {
                ElMessage.error(e.message);
            } else {
                ElMessage.error("请求发生错误 !!!");
                console.error(e);
            }
        }).finally(() => {
            this.tableLoading = false;
        });
    };

    /**
     *
     * @return {CRUDListParam}
     */
    getQueryParam() {
        const q=query();
        //1, 设置分页
        q.limit(this.pagination.pageSize)
        q.offset((this.pagination.currentPage - 1)*this.pagination.pageSize);
        
        //2, 设置 orderBy
        q.orderBy(new OrderBy(this.orderBy.fieldName, this.orderBy.sortType));

        //3, 设置 where
        

        //4, 设置 selectFilter
        const f = this.selectFilterBody;

        const a=and();
        //获取所有 like的查询项
        for (let key in this.where) {
            if (this.where.hasOwnProperty(key)) {
                const value1 = this.where[key];
                if (notBlank(value1)) {
                    a.like(key,value1)
                }
            }
        }
        
        q.where(a)

        return  {
            query:q,
            fieldFilter:f,
            extParams:{},
        };
    }

    validateScxCreateAndUpdateFormRef() {
        return new Promise((resolve, reject) => {
            this.editDialog.confirmButtonLoading = true;
            this.scxCreateAndUpdateFormRef.validate((valid) => {
                //如果所有数据都没有问题
                if (valid) {
                    resolve();
                } else {
                    //校验未通过 先取消确认按钮的loading 状态
                    this.editDialog.confirmButtonLoading = false;
                    focusFirstErrorElement();
                    reject();
                }
            });
        });
    };

    clearValidateScxCreateAndUpdateFormRef() {
        nextTick(() => this.scxCreateAndUpdateFormRef.clearValidate()).then();
    }

    createOrUpdateModel() {
        if (this.pageFlag === "create") {
            return this.createModel();
        } else if (this.pageFlag === "edit") {
            return this.updateModel();
        }
    }

    createModel(modelData = this.temp) {
        return new Promise((resolve, reject) => this.validateScxCreateAndUpdateFormRef().then(() => {
            //此处进行拷贝 防止 table 中的数据和 temp 产生影响
            let modelDataCopy = deepCopy(modelData);
            modelDataCopy.id = null;
            this.scxCrud.add(modelDataCopy).then(data => {
                this.tableBody.unshift(data);
                this.total = this.total + 1;
                this.editDialog.visible = false;
                ElNotification({
                    title: "添加成功", message: "成功添加 : " + this.getMainInfo(data), type: "success", duration: 5000,
                });
                resolve(data);
            }).catch(e => reject(this.reqErrorHandler(e))).finally(() => this.editDialog.confirmButtonLoading = false);
        }).catch(e => reject(e)));
    }

    updateModel(modelData = this.temp) {
        return new Promise((resolve, reject) => this.validateScxCreateAndUpdateFormRef().then(() => {
            //此处进行拷贝 防止table 中的数据和 temp 产生影响
            let modelDataCopy = deepCopy(modelData);
            this.scxCrud.update({
                updateModel: modelDataCopy,
                needUpdateFieldNames: this.needUpdateFieldNames,
            }).then(data => {
                //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
                this.updateTableBody(data);
                this.editDialog.visible = false;
                ElNotification({
                    title: "更新成功", message: "成功更新 : " + this.getMainInfo(data), type: "success", duration: 5000,
                });
                resolve(data);
            }).catch(e => reject(this.reqErrorHandler(e))).finally(() => this.editDialog.confirmButtonLoading = false);
        }).catch(e => reject(e)));
    }

    updateTableBody(data) {
        //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
        for (const v of this.tableBody) {
            if (v.id === data.id) {
                //获取要修改的 index 值
                const index = this.tableBody.indexOf(v);
                // 用 temp 进行替换
                this.tableBody.splice(index, 1, data);
                //因为 id 只可能出现一次 所以一旦找到相同的 id 直接 break 即可
                break;
            }
        }
    }

    handleCreate() {
        //设置添加确认按钮loading 为false 表示可以点击
        this.editDialog.confirmButtonLoading = false;
        //设置当前页面的 flag 是 create 还是 update
        this.pageFlag = "create";
        //清洗临时数据
        this.resetTemp();
        //准备添加页面的下拉选 自动完成框等数据并添加校验规则
        this.editDialog.visible = true;
        //清空当前表单的校验
        this.clearValidateScxCreateAndUpdateFormRef();
    }

    handleUpdate(row) {
        this.scxCrud.info(row.id).then(data => {
            this.editDialog.confirmButtonLoading = false;
            this.pageFlag = "edit";
            this.temp = data;
            //显示页面
            this.editDialog.visible = true;
            //清空当前表单的校验
            this.clearValidateScxCreateAndUpdateFormRef();
        }).catch(e => {
            console.error(e);
        });
    }

    handleQuery() {
        this.pagination.currentPage = 1;
        this.getList();
    }

    checkUnique(rule, value, callback, name) {
        if (value) {
            this.scxCrud.checkUnique(rule.field, value, this.pageFlag !== "create" ? this.temp.id : null)
                    .then(res => {
                        if (res.isUnique) {
                            callback();
                        } else {
                            callback(new Error(name + "已被占用 !!!"));
                        }
                    })
                    .catch(e => {
                        ElMessage.error("校验唯一值时发生错误, 请联系管理员 !!!");
                        console.error(e);
                    });
        } else {
            callback();
        }
    }

    /**
     * 当我们进行 添加 修改 时会给用户提示 具体哪条数据被操作了
     * 此方法便是从 具体的对象中提取某一字段作为基本信息返回
     * 如 数据为 {name:'小明'} 返回值则为 '小明' 默认取对象的第一个不为 id 的属性
     */
    getMainInfo(row) {
        const keys = Object.keys(row);
        for (let key of keys) {
            //id createDate updateDate 对用户来说并未太大意义 这里默认排除
            if (key !== "id" && key !== "createdDate" && key !== "updatedDate") {
                return row[key];
            }
        }
    }

    reqErrorHandler(e) {
        if (e instanceof JsonVOError) {
            ElMessage.error(e.message);
        } else {
            ElMessage.error("请求发生错误 !!!");
            console.error(e);
        }
        return e;
    }

    getDialogTitle() {
        return this.pageFlag === "create" ? "添加" : "编辑";
    }

    resetPagination() {
        this.pagination = deepCopy(this.getDefaultPagination());
        return this;
    }

    resetOrderBy() {
        this.orderBy = deepCopy(this.getDefaultOrderBy());
        return this;
    }

    resetSelectFilterBody() {
        this.selectFilterBody = deepCopy(this.getDefaultSelectFilterBody());
        return this;
    }

    resetWhere() {
        this.where = deepCopy(this.getDefaultWhere());
        return this;
    }

    resetTemp() {
        this.temp = deepCopy(this.getDefaultTemp());
        return this;
    }

    getDefaultPagination() {
        return {currentPage: 1, pageSize: 10};
    }

    getDefaultOrderBy() {
        return {fieldName: "id", sortType: "DESC"};
    }

    getDefaultSelectFilterBody() {
        return null;
    }

    getDefaultWhere() {
        return this.defaultWhere;
    }

    //默认的 临时状态对象
    getDefaultTemp() {
        return this.defaultTemp;
    }

    handleSelectionChange(columns) {
        this.multipleSelection = columns;
    }

    tableSelect(columns) {
        
    }

    tableSelectAll(columns) {
        
    }

    install(app) {
        app.provide(crudContextKey, this);
    }

}


/**
 *
 * @returns {CrudContext}
 */
function useCrudContext() {
    return inject(crudContextKey);
}

/**
 *
 * @param crudContext
 * @returns {CrudContext}
 */
function installCrudContext(crudContext) {
    if (!isReactive(crudContext)) {
        crudContext = reactive(crudContext);
    }
    provide(crudContextKey, crudContext);
    return crudContext;
}

export {CrudContext, installCrudContext, useCrudContext};
