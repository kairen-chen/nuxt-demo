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
    },
  });
};
export default store;
