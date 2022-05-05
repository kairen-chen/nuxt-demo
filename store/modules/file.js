import * as types from "../mutation-types";
import {
  headerConfig,
  getDomain,
  axiosInstance,
} from "@/fetch/vuexAxiosConfig";

// initial state
const state = () => ({
  articleFileData: null,
  npoFileData: null,
  profileData: null,
});

// getters
const getters = {
  articleFileDataGetter: (state) => state.articleFileData,
  npoFileDataGetter: (state) => state.npoFileData,
  profileGetter: (state) => state.profileData,
};

// actions
const actions = {
  getArticleFileData(context, params) {
    let { method, requestUrl } = service.getEvents;
    return axiosInstance({
      method: method,
      url: `${getDomain(context.rootState.env.data)}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
      },
    })
      .then((res) => {
        context.commit(types.GET_ARTICLEFILE, res.data);
      })
      .catch((err) => {
        console.warn("#### getArticleFileData fail! #### (" + err + ") ");
      });
  },
  getNpoFileData(context, params) {
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
        context.commit(types.GET_NPOFILE, res.data);
      })
      .catch((err) => {
        console.warn("#### getNpoFileData fail! #### (" + err + ") ");
      });
  },
  setProfile({ commit }, res) {
    commit(types.SET_PROFILE, res);
  },
};

// mutations
const mutations = {
  [types.GET_ARTICLEFILE](state, res) {
    state.articleFileData = res;
  },
  [types.GET_NPOFILE](state, res) {
    state.npoFileData = res;
  },
  [types.SET_PROFILE](state, res) {
    state.profileData = res;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
