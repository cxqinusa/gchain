<template>
  <div>
    <div class="container mx-auto">
      <div class="grid grid-cols-2">
        <div>
          <IgntAssets :key="address" class="px-2.5 mb-10" :display-limit="3" />
          <IgntTransactions :key="address" class="px-2.5" />
        </div>
        <IgntTransfer class="px-2.5 w-4/6 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddress } from "@/def-composables/useAddress";
import {getCurrentInstance, onMounted} from 'vue';
import IgntAssets from "../components/IgntAssets.vue";
import IgntTransactions from "../components/IgntTransactions.vue";
import IgntTransfer from "../components/IgntTransfer.vue";
const { address } = useAddress();

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
