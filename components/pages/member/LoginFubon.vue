<template>
  <div class="container">
    <div class="loginWrapper" @keyup.enter="handleSubmit">
      <div class="titileContainer">
        <img class="logo" src="@/assets/images/login/ic_fubon.svg" alt="" />
        <div class="title">
          富邦愛心志工社會員登入
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-person" class="icon" />
          <Input
            class="blueBorder"
            ref="_account"
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
            class="blueBorder password"
            ref="_password"
            v-model.trim="password"
            :type="'password'"
            :required="true"
          ></Input>
        </div>
        <div class="forgetPasswordContainer">
          <a
            class="forgetPassword"
            href="https://volunteer.fuboncharity.org.tw/password"
            target="blank"
            >忘記密碼</a
          >
        </div>
        <button
          class="blueFullColorBtn"
          @click="handleSubmit"
          v-prevent-re-click
        >
          登入
        </button>
        <router-link
          class="blueBorderBtn"
          :to="{ name: 'login', query: { redirect: $route.query.redirect } }"
        >
          取消
        </router-link>
        <div class="registMember">
          <div>
            沒有帳號嗎 ？
          </div>
          <a
            href="https://volunteer.fuboncharity.org.tw/register"
            target="blank"
            >註冊會員</a
          >
        </div>
      </div>
    </div>
    <div class="loginLoading"></div>
  </div>
</template>
<script>
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";

export default {
  mixins: [validateMixin],
  components: {
    Input,
  },
  data() {
    return {
      account: null,
      password: null,
    };
  },
  mounted() {
    if (localStorage.getItem("accessToken")) {
      this.$router.replace({ path: "/" }).catch(() => {});
    } else {
      document.getElementsByClassName("loading")[0].style.display = "none";
      document.getElementsByClassName("loginLoading")[0].style.display = "none";
    }
  },
  methods: {
    handleSubmit() {
      this._validate(
        [{ account: this.account }, { password: this.password }],
        (pass) => {
          if (pass) {
            document.getElementsByClassName("loginLoading")[0].style.display =
              "block";
            let postData = {
              username: this.account,
              password: this.password,
            };
            this._API.loginFubon.send(postData).then((res) => {
              if (res.token) {
                this.$store.dispatch("delToken");
                this.$store
                  .dispatch("setToken", {
                    accessToken: res.token.accessToken,
                    refreshToken: res.token.refreshToken,
                    loginType: "fubon",
                  })
                  .then(() => {
                    this._API.getProfile.send().then((profile) => {
                      this.$store.dispatch("setProfile", profile);
                      // redirect
                      this.$router
                        .replace({
                          path: this.$route.query.redirect
                            ? decodeURI(this.$route.query.redirect)
                            : "/",
                        })
                        .catch(() => {});
                    });
                  });
              } else {
                document.getElementsByClassName(
                  "loginLoading"
                )[0].style.display = "none";
                /**
                 * 1.userNotFound => 可能是取不到token.
                 * 2.未在微樂註冊 userNotRegister => 呼叫Fubon api成功, 不過在微樂資料庫中找不到帳號, 需導向重新註冊新帳號.
                 * */
                let error = res.errors[0].error;
                this.errorNotice(error);
                if (error === "userNotRegister") {
                  this.$router.push({
                    name: "regist",
                    params: {
                      account: res.username || null,
                      accessCode: res.accessCode,
                    },
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
</style>
