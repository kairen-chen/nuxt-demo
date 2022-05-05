import * as types from "../mutation-types";
import {
  headerConfig,
  getDomain,
  axiosInstance,
} from "@/fetch/vuexAxiosConfig";

// initial state
const state = () => ({
  activityUnitData: null,
});

// getters
const getters = {
  activityUnitGetter: (state) => state.activityUnitData,
};

// actions
const actions = {
  getActivityUnitData(context, params) {
    let { method, requestUrl } = service.getNpos;
    return axiosInstance({
      method: method,
      url: `${getDomain(context.rootState.env.data)}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
      },
    })
      .then((res) => {
        context.commit(types.GET_NPO, res.data);
      })
      .catch((err) => {
        console.warn("#### getNpoData fail! #### (" + err + ") ");
      });
  },
};

// mutations
const mutations = {
  [types.GET_NPO](state, res) {
    state.activityUnitData = res;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
