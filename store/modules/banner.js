import * as types from "../mutation-types";
import {
  headerConfig,
  getDomain,
  axiosInstance,
} from "@/fetch/vuexAxiosConfig";

// initial state
const state = () => ({
  bannerData: null,
});

// actions
const actions = {
  getBannerData(context) {
    if (context.state.bannerData && context.state.bannerData.results.length > 0)
      return;
    this._vm._API.getBanner
      .send({
        sort: `displaySort,desc`,
      })
      .then((res) => {
        context.commit(types.GET_BANNER, res);
      });
  },
};

// mutations
const mutations = {
  [types.GET_BANNER](state, res) {
    state.bannerData = res;
  },
};

// getters
const getters = {
  bannerDataGetter: (state) => state.bannerData,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
