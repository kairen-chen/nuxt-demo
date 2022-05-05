import * as types from "../mutation-types";
// initial state
const state = () => ({
  webVisibility: false,
});

// getters
const getters = {
  webVisibilityGetter: (state) => state.webVisibility,
};

// actions
const actions = {
  setWebVisibility({ commit }, flag) {
    commit(types.SET_WEBVISIBILITY, flag);
  },
};

// mutations
const mutations = {
  [types.SET_WEBVISIBILITY](state, flag) {
    state.webVisibility = flag;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
