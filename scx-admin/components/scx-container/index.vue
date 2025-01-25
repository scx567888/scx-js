<template>

    <div class="scx-container">

        <div class="left-page">
            <slot name="left-page"/>
        </div>

        <div class="right-page">
            <slot/>
        </div>

    </div>

</template>
<script>
import "./index.css";

export default {
    name: "scx-container"
};
</script>
