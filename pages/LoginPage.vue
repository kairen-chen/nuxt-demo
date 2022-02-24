<template>
  <div class="container">
    <div class="loginWrapper" @keyup.enter="handleSubmit">
      <div class="titileContainer">
        <div class="orangeTitle">
          登入
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-person" class="icon" />
          <Input
            class="orangeBorder"
            ref="_email"
            v-model.trim="account"
            :type="'email'"
            :required="true"
          ></Input>
        </div>
        <div class="inputContainer">
          <img
            class="icon"
            src="@/assets/images/login/ic_password.svg"
            alt=""
          />
          <Input
            class="orangeBorder password"
            ref="_password"
            v-model.trim="password"
            :type="'password'"
            :required="true"
          ></Input>
        </div>
        <div class="forgetPasswordContainer">
          <router-link
            class="forgetPassword"
            :to="{
              name: 'forgetPassword',
              query: { redirect: redirectHandler().path },
            }"
          >
            忘記密碼
          </router-link>
        </div>
        <button
          class="orangeFullColorBtn"
          @click="handleSubmit"
          v-prevent-re-click
        >
          登入
        </button>
        <div class="registMember">
          <div>
            沒有帳號嗎 ？
          </div>
          <router-link
            :to="{
              name: 'regist',
              query: { redirect: redirectHandler().path },
            }"
          >
            註冊會員
          </router-link>
        </div>
        <div class="dividerContainer">
          <span>以其他帳號登入</span>
        </div>
        <router-link
          class="garyBorderBtn"
          :to="{
            name: 'loginFubon',
            query: { redirect: redirectHandler().path },
          }"
        >
          <img src="@/assets/images/login/ic_fubon.svg" alt="" />
          我是富邦愛心志工社會員
        </router-link>

        <a
          class="garyBorderBtn"
          :href="`${twmLoginAPI}&state=${redirectHandler().path}`"
        >
          <!-- 
              production use
              https://oauth.taiwanmobile.com/MemberOAuth/authPageLogin?response_type=code&client_id=fihcloud&redirect_uri=https://isharing.fihcloud.com/oauth/twmcallback
              
              IP白名單
              219.90.56.180
              219.90.56.181

              client_id : fihcloud
              
              帳號：0900005001
              密碼：TWM09350935
              
              帳號：0988535122
              密碼：TWM09350935
              
              redirect_uri
              https://isharing.fihcloud.com/oauth/callback
              http://isharing.fihcloud.com/oauth/callback
              https://isharing.fihcloud.com/oauth/twmcallback
              http://isharing.fihcloud.com/oauth/twmcallback
          -->
          <img src="@/assets/images/login/ic_twm.png" alt="" />
          我是台灣大哥大會員
        </a>
      </div>
    </div>
    <div class="loginLoading"></div>
  </div>
</template>

<script>
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";

export default {
  props: ["route"],
  mixins: [validateMixin],
  components: {
    Input,
  },
  data() {
    return {
      account: null,
      password: null,
      twmLoginAPI: "",
    };
  },
  mounted() {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("accessToken") !== "null"
    ) {
      if (!this.$store.state.login.accessToken) {
        this.$store
          .dispatch("setToken", {
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
          })
          .then(() => {
            this.$router
              .replace({
                path: this.redirectHandler().path,
              })
              .catch(() => {});
          });
      } else {
        this.$router
          .replace({
            path: this.redirectHandler().path,
          })
          .catch(() => {});
      }
    } else {
      document.getElementsByClassName("loading")[0].style.display = "none";
      document.getElementsByClassName("loginLoading")[0].style.display = "none";
      this.twmLoginAPI =
        this.$store.state.env.data.MODE === "production"
          ? `https://oauth.taiwanmobile.com/MemberOAuth/authPageLogin?response_type=code&client_id=fihcloud&redirect_uri=${this.protocolHandler()}/oauth/twmcallback`
          : `https://stage.oauth.taiwanmobile.com/MemberOAuth/authPageLogin?response_type=code&client_id=fihcloud&redirect_uri=${this.protocolHandler()}/oauth/twmcallback`;
    }
  },
  methods: {
    protocolHandler() {
      return location.origin;
    },
    redirectHandler() {
      //導回哪裡
      let path = "/",
        fromInfo = this.route.from;

      if (this.$route.query.redirect) {
        if (this.$route.query.redirect.search(/login|user/) < 0) {
          path = this.$route.query.redirect;
        }
      } else if (fromInfo) {
        if (fromInfo.path.search(/login|user/) < 0) {
          path = fromInfo.path;
        }
      }
      return { path };
    },
    handleSubmit() {
      this._validate(
        /**
         * 必填欄位驗證
         * 注意:
         * 1. 以array[object]傳送參數
         * 2. val != '' || null,
         *      key需有在validateMixin內定義檢查格式或mapping過才會驗證,
         *      未找到驗證格式res = true
         * 3. val = '' || null,
         *      res = false
         * 4. 非必填欄位請勿加入驗證,否則執行Step2
         * */
        [{ username: this.account }, { password: this.password }],
        (pass) => {
          if (pass) {
            document.getElementsByClassName("loginLoading")[0].style.display =
              "block";
            let postData = {
              username: this.account,
              password: this.password,
            };
            this._API.authToken.send(postData).then((res) => {
              if (res.accessToken) {
                this.$store.dispatch("delToken");
                this.$store
                  .dispatch("setToken", {
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    loginType: "isharing",
                  })
                  .then(() => {
                    this._API.getProfile.send().then((profile) => {
                      this.$store.dispatch("setProfile", profile);
                      // redirect
                      this.$router
                        .replace({
                          path: this.redirectHandler().path,
                        })
                        .catch();
                    });
                  });
              } else {
                document.getElementsByClassName(
                  "loginLoading"
                )[0].style.display = "none";
                /**
                 * 1.帳號或密碼錯誤
                 * 2.未在微樂註冊
                 * */
                let error = res.error;
                this.errorNotice(error);
                if (error === "userNotFound") {
                  this.$router.push({
                    name: "regist",
                  });
                }
              }
            });
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
.loginWrapper {
  .formContainer {
    .dividerContainer {
      display: flex;
      margin: 30px 0 20px;
      color: map-get($color, "Gary40");
      &::before {
        content: "";
        flex: 1;
        border-top: 1px solid map-get($color, "Gary30");
        margin: 12px 12px 0 0;
      }
      &::after {
        content: "";
        flex: 1;
        border-top: 1px solid map-get($color, "Gary30");
        margin: 12px 0 0 12px;
      }
    }
  }
}
</style>
