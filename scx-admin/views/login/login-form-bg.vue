<template>
    <div class="login-form-bg">
        <!-- 上面的说明文字 -->
        <div class="title-container">
            <scx-icon icon="outlined-scx-logo"/>
            <span>系统登录</span>
        </div>
        <slot/>
    </div>
</template>
<script setup>

</script>

<style scoped>

/*登录表单背景*/
.login-form-bg {
    padding: 20px 20px 25px 20px;
    width: 400px;
    border-radius: 10px;
    transition: all 300ms ease-in-out;
}


/*鼠标移入使背景明显*/
.login-form-bg:hover {
    background: rgb(30, 30, 30);
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
}

/*登录标题*/
.title-container {
    margin-bottom: 10px;
    position: relative;
}

/*scx logo*/
.title-container > .scx-icon {
    height: 44px;
    width: 50px;
    fill: #1890ff;
    vertical-align: top;
    margin-right: 2%;
    margin-left: 19%;
    margin-top: 4px;
    transition: all 0.5s ease-out;
}

.title-container > .scx-icon:hover {
    fill: #489349;
}

/*标题文字*/
.title-container > span {
    font-size: 33px;
    color: rgba(255, 252, 248, 0.85);
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
}
</style>
