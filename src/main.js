import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import Utils from "./common/Utils.vue";
import Config from "./common/Config.vue";

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.prototype.$u = Utils;
Vue.prototype.$cfg = Config;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
