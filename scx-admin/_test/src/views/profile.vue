<template>
  <div style="padding: 30px;display: flex;column-gap: 20px;width: 100%;box-sizing: border-box">
    <el-card class="user-profile-card">
      <template #header>
        <div class="user-profile-card-header">
          个人中心
        </div>
      </template>
      <user-profile/>
    </el-card>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

</script>
<style scoped>
.user-profile-card {
  width: 400px;
  flex-shrink: 0;
}

.user-profile-card-header {
  font-weight: 600;
  font-size: 20px;
}
</style>
