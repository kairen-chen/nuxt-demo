<template>
  <div class="container">
    <div class="nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/pic">PicList</nuxt-link>
      <nuxt-link to="/pic/1">Pic 1</nuxt-link>
      <nuxt-link to="/pic/2">Pic 2</nuxt-link>
    </div>
    <nuxt />
    <div class="lightbox" v-show="$route.meta.lightbox">
      <div class="content">
        <nuxt name="lightbox" />
        <button @click="closeHandler">X</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // middleware: "routeHandler",
  data() {
    return {};
  },
  methods: {
    closeHandler() {
      let count = this.$store.state.lightbox * -1;
      this.$store.commit("RESET_LIGHTBOX");

      // 往回跑
      this.$router.go(count);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.container {
  .nav {
    margin-bottom: 20px;
  }
  a {
    display: inline-block;
    padding: 10px;
    border: 1px solid red;
    border-radius: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .lightbox {
    position: fixed;
    top: 50px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
      position: relative;
      width: 800px;
      height: 600px;
      background-color: white;
      button {
        line-height: 40px;
        font-size: 40px;
        position: absolute;
        right: -30px;
        top: -30px;
        width: 50px;
        height: 50px;
        background-color: rgba(78, 0, 255, 0.3);
      }
    }
  }
}
</style>
