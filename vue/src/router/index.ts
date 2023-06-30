import { createRouter, createWebHistory } from "vue-router";

import DataView from "../views/DataView.vue";
import GameView from "../views/GameView.vue";
import PortfolioView from "../views/PortfolioView.vue";

const routerHistory = createWebHistory();
const routes = [
  { path: "/", component: PortfolioView },
  { path: "/data", component: DataView },
  { path: "/game", component: GameView },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
