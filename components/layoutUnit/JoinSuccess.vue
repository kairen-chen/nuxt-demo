<template>
  <div class="container">
    <div class="joinContainer">
      <img
        class="mail"
        src="https://www.isharing.tw/static/images/big_mail.png"
        alt=""
      />
      <img src="https://www.isharing.tw/static/images/join_3.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/page/footer/common.scss";
.joinContainer {
  padding: 0 10px 20px;
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mail {
    width: 300px;
    margin-bottom: 40px;
  }
  img {
    max-width: 100%;
  }
}
</style>
