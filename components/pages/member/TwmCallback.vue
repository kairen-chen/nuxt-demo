<template>
  <div class="container"></div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.getItem("accessToken")) {
      this.$router.replace({ path: "/" });
    } else {
      if (window.location.href.search(/code/) < 0) {
        this.$router.replace({ name: "home" }).catch(() => {});
      } else {
        this.twmLoginHandler(this.geturlpara(window.location.href).code);
      }
    }
  },
  methods: {
    twmLoginHandler(code) {
      this._API.loginTWM.send({ code }).then((res) => {
        if (res.token) {
          this.$store.dispatch("delToken");
          this.$store
            .dispatch("setToken", {
              accessToken: res.token.accessToken,
              refreshToken: res.token.refreshToken,
              loginType: "twm",
            })
            .then(() => {
              this._API.getProfile.send().then((profile) => {
                this.$store.dispatch("setProfile", profile);
                // redirect
                this.$router
                  .replace({
                    path: decodeURIComponent(
                      this.geturlpara(window.location.href).state
                    ),
                  })
                  .catch(() => {});
                // .then(() => {
                // if (res.token.bind !== undefined && !res.token.bind) {
                //   this.$Notice.warning({
                //     title: "您的帳號尚未與微樂志工帳號綁定！",
                //   });
                // }
                // });
              });
            });
        } else {
          document.getElementsByClassName("loading")[0].style.display = "none";
          /**
           * 1.重取code
           * 2.未在微樂註冊 userNotRegister => 呼叫loginTWM api成功, 不過在微樂資料庫中找不到帳號, 需導向重新註冊新帳號.
           * */
          let error = res.errors[0].error;
          // error === "invalidTWMToken" 自動到台哥大換新code
          // this._redirect(
          //   `https://stage.oauth.taiwanmobile.com/MemberOAuth/authPageLogin?response_type=code&client_id=fihcloud&redirect_uri=http://isharing.fihcloud.com/oauth/twmcallback&state=${
          //     this.geturlpara(window.location.href).state
          //   }`,
          //   "self"
          // );
          this.errorNotice(error);
          if (error === "userNotRegister") {
            this.$router.push({
              name: "regist",
              params: {
                account: res.username || null,
                accessCode: res.accessCode,
              },
            });
          } else if (error === "userNotFound") {
            this.$router.replace({ name: "login" }).catch(() => {});
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
</style>
