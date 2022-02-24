<template>
  <section>
    <h1>Pic</h1>
    <div class="bigPic">{{ $route.params.id }}</div>
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
  mounted() {
    if (this.$route.meta.lightbox) {
      this.$store.commit("LIGHTBOX");
    }
  },
  updated() {
    if (this.$route.meta.lightbox) {
      this.$store.commit("LIGHTBOX");
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bigPic {
  width: 600px;
  height: 400px;
  border: 5px solid;
  margin: 0 auto;
}
</style>
