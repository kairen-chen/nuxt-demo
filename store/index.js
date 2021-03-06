// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios'
// Vue.use(Vuex)

export const state = () => ({
    obj:'Path -> store/index.js',
    contents:[],//要共用的data
    update_param:''
})
export const getters = {
  getter_content: state => {
      alert("getter有cache機制")
      return state.contents.filter(item => item.id != null)
    },
  //使用上一個getter method dosomething
  getter_content_count: (state, getters) => {
    return getters.getter_content.length
  },
  // 傳參取得
  getter_content_ById: (state) => (index) => {
    return state.contents.find(item => item.id === state.contents[index]['id'])
  }
}
export const mutations = {
  change_obj(state,data){
    state.obj = data;
  },
  SET_CONTENT(state,data){
      state.contents = data;
  },
  ADD_CONTENT(state,data){
    state.contents.push(data);
  },
  DELETE_CONTENT(state,data){
    state.contents.splice(data,1)
  },
  UPDATE_CONTENT(state,{item,input}){
    item.content=input;
  },
  SET_UPDATE_PARAM(state,index){
    // state.update_param = index;
    if(state.contents[index] == state.update_param){
      state.update_param = '';
    }
      state.update_param = state.contents[index];
  }
}

export const actions = {
  // async CONTENTS_READ (context){
  //   var res = await axios.get('http://localhost:4000/contents');
  //   context.commit('SET_CONTENT',res.data);
  // },
  CONTENTS_CREATE:(context,{input})=>{
    return axios.post('http://localhost:4000/contents',{
      content:input
    }).then((res)=>{
      context.commit('ADD_CONTENT',res.data);
    });
  },
  CONTENTS_READ:(context)=>{
    // return axios.get('http://localhost:4000/contents')
    // .then((res)=>{
    //    context.commit('SET_CONTENT',res.data);
    // });

    return axios.get('http://localhost:4000/contents')
      .then((res)=>{
        if (res.status === 200)
          Promise.resolve(context.commit('SET_CONTENT', res.data));
        else
          Promise.reject(console.log("server warning!!! --> ", res.status))
      }).catch(err=>{
          Promise.reject(console.log("server error!!! --> ", err))
      });
  },
  CONTENT_UPDATE:(context,{id ,input})=>{
    let item=context.state.contents.find((item)=>{
      return item.id == id
    })
    if(!item) return false
    return axios.patch(
      'http://localhost:4000/contents/'+item.id,{content:input}
      ).then((res)=>{
        // item.content=input;//state資料不會同步更新
        context.commit('UPDATE_CONTENT', {item,input});
      })
    },
  CONTENTS_DELETE:(context,{target})=>{
    let index=context.state.contents.indexOf(target)
    if(index==-1) return false
    return axios.delete(`http://localhost:4000/contents/${target.id}`).then((res)=>{
      context.commit('DELETE_CONTENT', index);
    })
  }
}

// const store = () => {
//   return new Vuex.Store({
//     // strict:true,
//     state:{
//       contents:[]//要共用的data
//     },
//     mutations:{
//       SET_CONTENT(state,data){
//         state.contents = data;
//       },
//       ADD_CONTENT(state,data){
//         state.contents.push(data);
//       },
//       DELETE_CONTENT(state,data){
//         state.contents.splice(data,1)
//       },
//       UPDATE_CONTENT(state,{item,input}){
//         item.content=input;
//       }
//     },
//     actions:{
//       CONTENTS_READ:(context)=>{
//         return axios.get('http://localhost:4000/contents').then((res)=>{
//           context.commit('SET_CONTENT',res.data);
//         })
//       },
//       CONTENTS_DELETE:(context,{target})=>{
//         let index=context.state.contents.indexOf(target)
//         if(index==-1) return false
//         return axios.delete(`http://localhost:4000/contents/${target.id}`).then((res)=>{
//           context.commit('DELETE_CONTENT', index);
//         })
//       },
//       CONTENT_UPDATE:(context,{id ,input})=>{
//         let item=context.state.contents.find((item)=>{
//           return item.id == id
//         })
//         if(!item) return false
//         return axios.patch(
//             'http://localhost:4000/contents/'+item.id,{content:input}
//           ).then((res)=>{
//             // item.content=input;//state資料不會同步更新
//           context.commit('UPDATE_CONTENT', {item,input});
//         })
//       }
//     }
//   })
// }

// export default store
