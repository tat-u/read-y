import { createApp } from "vue";
import App from "./views/App.vue";
import "./style.css";

function mountApp() {
  const container = document.createElement("div");
  container.id = "crxjs-app";
  document.body.appendChild(container);
  const app = createApp(App);
  app.mount(container);
}

mountApp();
