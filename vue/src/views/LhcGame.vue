<template>
  <div style='margin:0'>
    <div id="game-container"></div>
  </div>
</template>

<script>
import { initGame,stopGame } from "@/lhc/main.js";

export default {
  name: "LhcGame",
  mounted() {
    // 触发自定义事件，通知父组件切换 showHeader 的值
    //console.log('LhcGame ignite-header:false');
    //this.eventBus.emit("igniteHeaderChanged", false);
    this.game = initGame();
  },
  beforeUnmount() {
    //console.log('LhcGame ignite-header:true');
    //this.eventBus.emit("igniteHeaderChanged", true);
    stopGame(this.game);
  },
};

</script>
