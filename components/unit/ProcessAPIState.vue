<template>
  <section>
    <div v-if="dataLength == 0 && loadingFlag == false">查無資料</div>
    <div v-if="loadingFlag">
      Loading...
      <!-- <img
        class="icon"
        src="@/assets/images/header/back_btn.svg"
        alt=""
      /> -->
    </div>
  </section>
</template>
<script>
export default {
  props: ["dataLength", "loadingFlag"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
</style>
