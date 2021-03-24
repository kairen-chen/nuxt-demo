<template lang="pug">
  section
    div.button--green(@click='call_method') component call method of parent
    <div>
      <p>
        <input type="text" name="" v-model.trim='input'>
        <a href="#" @click='createHandler'>CREATE</a>
      </p>
      <ol>
        <li v-for='(item,index) in contents' :key='item.id'>{{item.content}}
          <button @click='updateHandler(index)'>UPDATE</button>
          <button @click='deleteHandler(index)'>DELETE</button>
        </li>
      </ol>
    </div>
    slot(name='title')
    slot(name='img')
</template>


<script>
  import {mapState, mapGetters } from 'vuex';

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
      //物件展開運算符 -> https://jeremysu0131.github.io/Vue-js-Vuex-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-6-mapState-%E8%88%87-mapGetters-%E5%90%88%E4%BD%B5%E4%BD%BF%E7%94%A8/
      ...mapState([
        'obj'
      ]),
      //解釋這神奇用法
      //mapGetters是一個maping key的method
      //傳入[要取得的obj key]
      //回傳1個obj{getter_content:fn1(),....},共三個fn在裡面
      //再把物件展開(其實是複製) -> computed:{...{obj}}
      ...mapGetters([
        'getter_content',
        'getter_content_count',
        'getter_content_ById',
      ]),
      // 以上=以下
      // getter_content() {
      //     return this.$store.getters['getter_content']
      // }
      //亦可重新命名
      ...mapGetters({
        test:'getter_content'
      })
    },
    created(){},
    mounted(){
      let obj = {a1:'3',b:'4'}
      // 複製、合併串聯多個物件
      // 與陣列不同的是: 有相同屬性名的，合併後只會使用最後一個物件的內容值
      console.log('物件展開(複製、合併)demo --> ',{ ...{a:'1',b:'2'} , ...obj } )

      console.log('vuex映射取值 -> ',this.obj,this.test,
        'mapGetters res ->',mapGetters(['getter_content','getter_content_count'])
      )
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
        console.log('getter_demo(擴展):',this.getter_content_ById(index))

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
