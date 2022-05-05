import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import banner from "./modules/banner";
import event from "./modules/event";
import donate from "./modules/donate";
import npo from "./modules/npo";
import search from "./modules/search";
import webVisibility from "./modules/webVisibility";
import file from "./modules/file";
import env from "./modules/env";

Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    modules: {
      login,
      banner,
      event,
      donate,
      npo,
      search,
      webVisibility,
      file,
      env,
    },
  });
};
export default store;
