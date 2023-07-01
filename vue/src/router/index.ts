import { createRouter, createWebHistory } from "vue-router";

import DataView from "../views/DataView.vue";
import LhcGame from "../views/LhcGame.vue";
import SnowGame from "../views/SnowGame.vue";
import PortfolioView from "../views/PortfolioView.vue";

const routerHistory = createWebHistory();
const routes = [
  { path: "/", component: PortfolioView },
  { path: "/data", component: DataView },
  { path: "/lhc", component: LhcGame },
  { path: "/snow", component: SnowGame },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
