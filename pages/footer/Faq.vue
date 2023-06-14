<template>
  <div class="container">
    <BreadCrumb />
    <div class="content-event">
      <div class="event-block">
        <h2>常見問題</h2>
        <b>我是志工</b><br />
        <ol class="section">
          <li>
            我要如何報名活動？
            <div>
              註冊登入微樂志工後，在您想要報名的活動頁面按下報名鍵填入資料，即可完成報名。
            </div>
          </li>
          <li>
            我的資料輸入後，雲端個人履歷是否會有個資外洩疑慮？
            <div>
              本服務有建立資料加密機制，加上台灣大哥大6星級機房最高安全防火牆把關，守護您的資料。
            </div>
          </li>
          <li>
            到了現場，我要如何使用QRcode報到？
            <div>
              請按下快速報到
              <div class="imgContent">
                <img src="https://www.isharing.tw/static/images/my_event.png" />
              </div>
              中該活動的報到鍵，即會出現QRcode掃瞄頁面，掃瞄公益團體現場準備的QRcode，即完成報到手續。
            </div>
          </li>
          <li>
            報名後，我如果臨時有事情，該怎麼辦？
            <div>
              報名後，若發現無法參加，可於活動頁面按下取消報名即可。<br />
              溫馨小提醒：各位志工朋友若需取消報名，請盡量提早取消，以利公益團體人力安排
            </div>
          </li>
          <li>
            我想要找朋友一起參加志工活動，該怎麼辦？
            <div>
              活動頁面設有各式社群分享功能，如facebook、e-mail等，邀請您的朋友一起做公益。<br />
              活動結束後，我要如何去評分此志工活動？<br />
              在活動結束後，您可以在活動履歷
              <div class="imgContent">
                <img src="https://www.isharing.tw/static/images/member.png" />
              </div>
              看到您所參與的活動，即可進行評分動作。<br />
              溫馨小提醒：實際有報到的活動才可評分<br />
            </div>
          </li>
        </ol>
        <br />
        <b>我是公益團體</b>
        <ol class="section">
          <li>
            我想要在微樂志工平台開始招募志工，需要哪些程序？刊登活動是免費的嗎？
            <div>
              步驟1 請先註冊微樂志工帳號（為組織管理者唯一帳號）<br />
              步驟2 微樂志工網頁選擇成為夥伴（
              <router-link :to="{ name: 'footerJoin' }">
                {{ `${origin}/join` }}</router-link
              >
              ）輸入帳號及組織全名<br />
              步驟3 系統將自動發信到您註冊的帳號，並附上專屬連結<br />
              步驟4 進行登入及填寫組織資料<br />
              步驟5
              審核通過，自動開啟後台刊登活動權限，即可開始刊登活動，招募志工<br />
              ＊刊登服務完全免費。<br />
            </div>
          </li>

          <li>
            我填寫的申請表單一直送不出去？一直跑出錯誤畫面？
            <div>
              若申請表單無法送出表示您有必填相關資訊未填寫，系統會告知您何種資料尚未填寫，請您重<br />
              新審閱過表單內容。
            </div>
          </li>

          <li>
            收到審核通過通知後，進入微樂志工後台(
            <router-link :to="{ path: 'backend' }">
              {{ `${origin}/backend` }}</router-link
            >
            )登入組織管理者帳號密碼，即可開始刊登活動
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      origin: "",
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    this.origin = location.origin;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/page/footer/common.scss";
.section {
  padding-left: 40px;
  margin-top: 20px;
  li {
    margin-bottom: 10px;
    div {
      margin-top: 3px;
    }
  }
  .imgContent {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-top: 0;
    img {
      width: 100%;
      position: absolute;
      bottom: -3px;
    }
  }
}
</style>
