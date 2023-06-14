<template>
  <div class="container">
    <p align="center">
      <img
        src="https://www.isharing.tw/static/images/logo_download.png"
        align="center"
        width="130"
      />
    </p>
    <div align="center">
      <div class="title">
        您現在正在開啟網頁版微樂志工<br />
        建議您下載微樂App
      </div>
      <div class="subTitle">立即前往下載</div>
      <br />
    </div>
    <div align="center">
      <button
        onclick="location.href='https://itunes.apple.com/tw/app/wei-le-zhi-gong/id823341128?l=zh&mt=8'"
      >
        iOS 微樂 App
      </button>
      <br />
      <button
        onclick="location.href='https://play.google.com/store/apps/details?id=com.taiwanmobile.volunteers'"
      >
        Android 微樂 App
      </button>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.querySelector(".headerWrapper").style.display = "none";
    document.querySelector(".footerContainer").style.display = "none";
  },
  destroyed() {
    document.querySelector(".headerWrapper").style.display = "";
    document.querySelector(".footerContainer").style.display = "";
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/page/footer/common.scss";
.title {
  color: map-get($color, "Orange10");
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
}
.subTitle {
  font-size: 15px;
  color: map-get($color, "Gary40");
}
button {
  width: 200px;
  font-size: 15px;
  margin-bottom: 20px;
  outline: 0;
  border: 0;
  background-color: map-get($color, "Orange10");
  color: map-get($color, White);
  padding: 20px;
  border-radius: 50px;
}
</style>
