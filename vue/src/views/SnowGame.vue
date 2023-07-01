<template>
  <div style='margin:0'>
    <div id="game-container"></div>
  </div>
</template>

<script>
import { initGame,stopGame } from "@/snow/main.js";

export default {
  name: "SnowGame",
  mounted() {
    this.game = initGame();
  },
  beforeUnmount() {
    stopGame(this.game);
  },
};
</script>
