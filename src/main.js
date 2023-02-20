import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleUp, faCheck);

import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
