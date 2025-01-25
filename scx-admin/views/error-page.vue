<template>
    <div class="error-page">
        <h1 class="heading">{{ message }}</h1>
        <rocket/>
        <div class="home-btn" @click="goHome">返回首页</div>
    </div>
</template>

<script>
import {useRouter} from "vue-router";
import Rocket from "./rocket.vue";

export default {
    name: "error-page",
    components: {Rocket},
    props: {
        message: {type: String}
    },
    setup() {

        const router = useRouter();

        function goHome() {
            router.push({name: "home"});
        }

        return {
            goHome
        };
    }
};


</script>

<style scoped>
.heading {
    text-align: center;
    font-size: 9em;
    line-height: 1.3em;
    margin: 0 0 10px 0;
    padding: 0;
    text-shadow: 0 0 1rem #fefefe;
    font-family: Arial, serif;
    color: #b4b4b4;
}

.home-btn {
    width: 150px;
    text-align: center;
    background: #FFFFFF;
    padding: 8px 16px;
    cursor: pointer;
    border: 2px solid #ADD7F9;
    border-radius: 5px;
    color: #ADD7F9;
    font-weight: 600;
    transition: transform 0.1s;
    user-select: none;
    margin-top: 60px;
    float: left;
}

.home-btn:hover {
    transform: translate(0, -2px);
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
}

.error-page {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

</style>
