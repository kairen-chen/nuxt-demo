<template>
  <div class="container">
    <UnderConstruction />
  </div>
</template>
<script>
export default {
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
</style>
