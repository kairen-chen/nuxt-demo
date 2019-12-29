<template lang="pug">
  <section>
    div.button--green(@click='call_method') component call method
    <div>
      <p>
        <input type="text" name="" v-model.trim='input'>
        <a href="javacript:;" @click='createHandler'>CREATE</a>
      </p>
      <ol>
        <li v-for='(item,index) in contents' :key='item.id'>{{item.content}}
          <a href="javacript:;" @click='updateHandler(index)'>UPDATE</a>
          <a href="javacript:;" @click='deleteHandler(index)'>DELETE</a>
        </li>
      </ol>
    </div>
    slot
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';

  export default {
    name:'vuex_list',
    data(){
      return{
        input:''
      }
    },
    computed:{
      contents(){
        return this.$store.state.contents
      },
      ...mapGetters([
        'getter_content',
        'getter_content_count',
        'getter_content_ById'
      ])
    },
    created(){},
    mounted(){
      //讀資料
      // this.CONTENTS_READ().then(() => {
      //   console.log('read success',res)
      // }).catch(res => {
      //   if(res == 'Error: Network Error'){
      //     console.log('出錯拉～',res)
      //     console.log('不管,繼續執行些什麼～回首頁')
      //     this.$router.replace({name:'index'})
      //   }
      // });

    },
    methods:{
      // getHandler(){
      // 	axios.get('http://localhost:4000/contents').then((data)=>{
      // 	this.contents = data.data;
      // });
      // },
      // async CONTENTS_READ(){
      //    await this.$store.dispatch('CONTENTS_READ');
      //    console.log(this.getter_content);
      //    console.log(this.getter_content_count);
      // },
      createHandler (){
        if(!this.input) return false;
        axios.post('http://localhost:4000/contents',{
          content:this.input
        }).then((res)=>{
          this.input='';
          // this.contents.push(res.data);
          //單向資料流寫入方式
          this.$store.commit('ADD_CONTENT',res.data);
        })
      },
      deleteHandler (index){
        let target = this.contents[index];

        // axios.delete(`http://localhost:4000/contents/${target.id}`).then(()=>{
        // 	this.contents.splice(index,1)
        // })
        this.$store.dispatch('CONTENTS_DELETE',{target});
      },
      updateHandler (index){
        //使用bus打事件帶值到input
        // bus.$emit('edit')
        this.$store.commit('SET_UPDATE_PARAM',index);
        bus.$emit('update_show',true)


        console.log('getter_demo(傳統):',this.$store.getters.getter_content_ById(index))
        //getter解構後可直接調用
        console.log('getter_demo(解構):',this.getter_content_ById(index))

      },
      call_method:()=>{
        //模擬emit,on時call method(父、component)
        bus.$emit('call_method')
      }
    }
  }
</script>


<style lang="scss" scoped>
  section{
    width: 500px;
    .button--green{
      margin-bottom: 20px;
    }
    pre{
      width: 500px;
    }
  }
</style>
