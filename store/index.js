export const state = () => ({
  lightbox: 0,
});
export const getters = {
  // getter_content: (state) => {
  //   alert("getter有cache機制");
  //   return state.contents.filter((item) => item.id != null);
  // },
};
export const mutations = {
  LIGHTBOX(state) {
    state.lightbox += 1;
  },
  RESET_LIGHTBOX(state) {
    state.lightbox = 0;
  },
};

export const actions = {
  // async CONTENTS_READ (context){
  //   var res = await axios.get('http://localhost:4000/contents');
  //   context.commit('SET_CONTENT',res.data);
  // },
  // CONTENTS_CREATE: (context, { input }) => {
  //   return axios
  //     .post("http://localhost:4000/contents", {
  //       content: input,
  //     })
  //     .then((res) => {
  //       context.commit("ADD_CONTENT", res.data);
  //     });
  // },
};
