import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast, { POSITION } from "vue-toastification";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.BOTTOM_RIGHT,
});

app.mount("#app");
