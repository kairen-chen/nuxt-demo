<template>
  <div>
    <img
      v-for="i in Number(starNum)"
      :key="i"
      src="@/assets/images/other/score_fill.svg"
      alt="score_fill"
    />
    <div>
      <img
        v-for="i in 5 - Number(starNum)"
        :key="i"
        src="@/assets/images/other/score.svg"
        alt="start"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    starNum: {
      type: Number,
      default: 1,
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  display: flex;
  img {
    width: 18px;
    margin-right: 3px;
  }
  div {
    display: flex;
    align-items: flex-end;
  }
}
</style>
