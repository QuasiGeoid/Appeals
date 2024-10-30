import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import SvgIcon from "@jamescoyle/vue-icon";

Vue.config.productionTip = false;

Vue.component("SvgIcon", SvgIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
