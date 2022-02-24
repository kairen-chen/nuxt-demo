import * as types from "../mutation-types";
import {
  headerConfig,
  getDomain,
  axiosInstance,
} from "@/fetch/vuexAxiosConfig";

// initial state
const state = () => ({
  donateData: null,
});

// getters
const getters = {
  donateDataGetter: (state) => state.donateData,
};

// actions
const actions = {
  getDonateData(context, params) {
    let { method, requestUrl } = service.getDonationNpos;
    return axiosInstance({
      method: method,
      url: `${getDomain(context.rootState.env.data)}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
      },
    })
      .then((res) => {
        context.commit(types.GET_DONATE, res.data);
      })
      .catch((err) => {
        console.warn("#### getDonateData fail! #### (" + err + ") ");
      });
  },
};

// mutations
const mutations = {
  [types.GET_DONATE](state, res) {
    state.donateData = res;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
