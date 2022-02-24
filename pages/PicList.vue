<template>
  <section>
    <div>
      <h1>PicList</h1>
      <router-link class="pic" to="/pic/1">1</router-link>
      <router-link class="pic" to="/pic/2">2</router-link>
    </div>
  </section>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue';

export default {
  components: {
    // AppLogo
  },
  data() {
    return {
      //   title:'Plugin',
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.pic {
  display: inline-block;
  width: 150px;
  height: 100px;
  border: 2px solid;
  margin: 0 10px;
}
</style>
