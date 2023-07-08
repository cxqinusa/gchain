import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import "./style/index.css";
import "@ignt/vue-library/dist/style.css";
import mitt from "mitt";

export const eventBus = mitt();
const app = createApp(App);
app.config.globalProperties.eventBus = eventBus;
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
