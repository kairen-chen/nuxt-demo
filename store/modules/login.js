import * as types from "../mutation-types";
// initial state
const state = () => ({
  accessToken: null,
  refreshToken: null,
  loginType: null,
});

// getters
const getters = {
  accessToken: (state) => state.accessToken,
  tokenType: (state) => state.refreshToken,
  loginType: (state) => state.loginType,
};

// actions
const actions = {
  setToken({ commit }, res) {
    return new Promise((resolve) => {
      commit(types.SET_TOKEN, res);
      commit(types.SET_LOGINTYPE, res.loginType);
      resolve("success");
    });
  },
  delToken({ commit, rootState }) {
    return new Promise((resolve) => {
      commit(types.DEL_TOKEN);
      commit(types.DEL_LOGINTYPE);
      rootState.file.profileData = null;
      resolve("success");
    });
  },
};

// mutations
const mutations = {
  [types.SET_TOKEN](state, res) {
    state.accessToken = res.accessToken;
    localStorage.setItem("accessToken", res.accessToken);
    state.refreshToken = res.refreshToken;
    // localStorage.setItem("refreshToken", res.refreshToken);
  },
  [types.DEL_TOKEN](state) {
    localStorage.removeItem("accessToken");
    state.accessToken = null;
    localStorage.removeItem("refreshToken");
    state.refreshToken = null;
    if (location.pathname.search(/backend/) === 1) {
      //backend
      localStorage.removeItem("id");
      localStorage.removeItem("uid");
      localStorage.removeItem("username");
      localStorage.removeItem("isNpo");
      localStorage.removeItem("isStaff");
      localStorage.removeItem("npoId");
    }
  },
  [types.SET_LOGINTYPE](state, res) {
    state.loginType = res;
    localStorage.setItem("loginType", res);
  },
  [types.DEL_LOGINTYPE](state) {
    state.loginType = null;
    localStorage.removeItem("loginType");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
