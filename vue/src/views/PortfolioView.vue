<template>
  <div>
    <div class="container mx-auto">
      <div class="grid grid-cols-2">
        <div>
          <IgntAssets :key="refreshKey" class="px-2.5 mb-10" :display-limit="3" />
          <IgntTransactions :key="address" class="px-2.5" />
        </div>
        <IgntTransfer class="px-2.5 w-4/6 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddress } from "@/def-composables/useAddress";
import {getCurrentInstance, onMounted, ref, watch} from 'vue';
import IgntAssets from "../components/IgntAssets.vue";
import IgntTransactions from "../components/IgntTransactions.vue";
import IgntTransfer from "../components/IgntTransfer.vue";
const { address } = useAddress();

const refreshKey = ref(0);

onMounted(() => {
  // 执行需要在组件挂载后执行的逻辑
  const instance = getCurrentInstance();
  if (instance) {
    const {appContext} = instance;
    const {eventBus} = appContext.config.globalProperties;
    eventBus.emit("igniteHeaderChanged", true);
  }

  // 设置定时器，每隔 2 秒重新渲染 IgntAssets 组件
  const refreshInterval = 2000; // 2 秒
  setInterval(refreshIgntAssets, refreshInterval);
});

// 定义一个 refreshIgntAssets 函数，用于重新渲染 IgntAssets 组件
const refreshIgntAssets = () => {
  // 更新 address 的值，从而触发 IgntAssets 组件的重新渲染
  console.log('refreshIgntAssets');
  refreshKey.value += 1;
};
</script>
