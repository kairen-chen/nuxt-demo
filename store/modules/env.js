import * as types from "../mutation-types";
// initial state
const state = () => ({
  data: {},
});

// actions
const actions = {
  setEnv({ commit }, obj) {
    commit(types.SET_EVN, obj);
  },
};

// mutations
const mutations = {
  async [types.SET_EVN](state, obj) {
    state.data = { ...obj };
  },
};

export default {
  state,
  actions,
  mutations,
};
