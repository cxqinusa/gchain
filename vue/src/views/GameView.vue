<template>
  <div style='margin:0'>
    <div id="game-container"></div>
  </div>
</template>

<script>
import { initGame } from "@/js/main.js";

export default {
  mounted() {
    initGame();
  },
};
</script>
