import * as types from "../mutation-types";
// initial state
const state = () => ({
  searchStr: null,
});

// getters
const getters = {
  searchStrGetter: (state) => state.searchStr,
};

// actions
const actions = {
  setSearchStr({ commit }, str) {
    commit(types.SET_SEARCHSTR, str);
  },
  delSearchStr({ commit }) {
    commit(types.DEL_SEARCHSTR);
  },
};

// mutations
const mutations = {
  [types.SET_SEARCHSTR](state, str) {
    state.searchStr = str;
  },
  [types.DEL_SEARCHSTR](state) {
    state.searchStr = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
