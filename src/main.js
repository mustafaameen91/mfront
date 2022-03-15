import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;
Vue.use(Toasted, {
   iconPack: "material",
   duration: 2000,
   position: "top-center",
});

new Vue({
   router,
   store,
   vuetify,
   render: (h) => h(App),
}).$mount("#app");
