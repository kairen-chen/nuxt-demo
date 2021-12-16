<template>
  <div class="container">
    <div class="loginWrapper" v-if="mainTemplateshow">
      <div class="titileContainer">
        <div class="title">
          請輸入當初申請時的電子信箱
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-mail" class="icon" />
          <Input
            class="orangeBorder"
            ref="_email"
            v-model.trim="account"
            :type="'email'"
            :required="true"
          ></Input>
        </div>
        <button
          class="orangeFullColorBtn"
          @click="handleSubmit"
          v-prevent-re-click
        >
          確定
        </button>
        <router-link
          class="orangeBorderBtn"
          :to="{ name: 'login', query: { redirect: $route.query.redirect } }"
        >
          取消
        </router-link>
      </div>
    </div>
    <div class="loginWrapper" v-else>
      <div class="titileContainer">
        <div class="title">
          密碼重新設定信件已送出
        </div>
      </div>
      <div class="formContainer">
        <p class="content">
          密碼重新設定信件已送至該電子信箱({{
            account
          }})，請至電子信箱收信，點擊信中之網頁連結進行修改密碼
        </p>
        <div class="orangeBorderBtn" @click="reset" v-prevent-re-click>
          確定
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
  components: { Input },
  data() {
    return { account: null, mainTemplateshow: true };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("loginLoading")[0].style.display = "none";
  },
  methods: {
    handleSubmit() {
      this._validate([{ email: this.account }], (pass) => {
        if (pass) {
          document.getElementsByClassName("loginLoading")[0].style.display =
            "block";
          let postData = {
            email: this.account,
            accessPage: `${location.origin}/user/resetPassword`,
          };
          this._API.forgetPassword.send(postData).then((res) => {
            document.getElementsByClassName("loginLoading")[0].style.display =
              "none";
            if (res.accessCode) {
              this.mainTemplateshow = false;
            } else if (res.error === "userNotFound") {
              this.errorNotice("email_userNotFound");
            }
          });
        }
      });
    },
    reset() {
      this.account = null;
      this.mainTemplateshow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
.inputContainer {
  margin-bottom: 58px;
}
.content {
  margin-bottom: 40px;
}
</style>
