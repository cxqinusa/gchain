<template>
  <div>
    <!-- Uncomment the following component to add a form for a `modelName` -->
    <!-- <IgntCrud store-name="OrgRepoModule" item-name="modelName" /> -->
  </div>
</template>
<script setup lang="ts">
import IgntCrud from "@/components/IgntCrud.vue";
import {getCurrentInstance, onMounted} from "vue";

onMounted(() => {
  // 执行需要在组件挂载后执行的逻辑
  const instance = getCurrentInstance();
  if (instance) {
    const {appContext} = instance;
    const {eventBus} = appContext.config.globalProperties;
    eventBus.emit("igniteHeaderChanged", true);
  }
});
</script>
