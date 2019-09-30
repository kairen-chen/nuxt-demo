<template lang="pug">
  div
    p
      //- 因使用vuex state render computed內無法做set 故v-model會error,替代方案
      input(type='text' :value='get_uptate_obj.content' @keyup='keyup($event.currentTarget.value)')
      //- input(type='text'  v-model.trim='input')

      a(href='javacript:;' @click='updateHandler')  UPDATE
</template>


<script>
  export default {
    components: {
    },
    data(){
      return{
        input:''
      }
    },
    computed:{
      //vuex render require!!
      get_uptate_obj(){
        return this.$store.state.update_param
      }
    },
    created(){},
    mounted(){
      //使用bus接事件
      // bus.$on('edit',()  => {
      //    this.input = this.get_uptate_obj.content;
      // });

      //組件call method 測試
      bus.$on('call_method',()  => {
         this.component_method();
      });
    },
    methods:{
      keyup(val){
        this.input = val;
      },
      updateHandler (){
        if(this.input){
          this.$store.dispatch('CONTENT_UPDATE',{
            id:this.get_uptate_obj.id,
            input:this.input
          }).then(()=>{
            bus.$emit('update_show',false)
            console.log('success')
          })
        }else{
          bus.$emit('update_show',false)
        }
      },
      component_method:()=>{
        alert('component_method')
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>
