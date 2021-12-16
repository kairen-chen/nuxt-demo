<template>
  <div class="container">
    <div class="loginWrapper">
      <div class="titileContainer">
        <div class="orangeTitle">
          密碼重設
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-lock" class="icon" />
          <Input
            class="orangeBorder password"
            ref="_password"
            v-model.trim="password"
            :type="'rolePassword'"
            :required="true"
          ></Input>
        </div>
        <div class="inputContainer">
          <Icon type="md-lock" class="icon" />
          <Input
            class="orangeBorder chcekPassword"
            ref="_checkPassword"
            v-model.trim="checkPassword"
            :type="'checkPassword'"
            :required="true"
            :placetext="'確認密碼'"
          ></Input>
        </div>
        <button
          class="orangeFullColorBtn"
          @click="handleSubmit"
          v-prevent-re-click
        >
          確定
        </button>
        <router-link class="orangeBorderBtn" :to="{ name: 'login' }">
          取消
        </router-link>
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
    return {
      password: null,
      checkPassword: null,
      accessCode: null,
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("loginLoading")[0].style.display = "none";
    this.accessCode = this.$route.query.accessCode;
  },
  methods: {
    handleSubmit() {
      this._validate(
        [
          { rolePassword: this.password },
          { checkPassword: this.checkPassword },
        ],
        (pass) => {
          if (pass) {
            document.getElementsByClassName("loginLoading")[0].style.display =
              "block";
            let postData = {
              password: this.password,
              accessCode: this.accessCode,
            };
            this._API.resetPassword.send(postData).then((res) => {
              if (res.error === "badPassword") {
                document.getElementsByClassName(
                  "loginLoading"
                )[0].style.display = "none";
                this.errorNotice(res.error);
              } else if (!res) {
                this.$router
                  .replace({
                    name: "login",
                  })
                  .then(() => {
                    this.$Notice.success({
                      title: "密碼已成功變更，請使用新密碼登入",
                    });
                  });
              } else {
                this.errorNotice(res.error);
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
.checkBoxContainer {
  display: flex;
  align-items: baseline;
  text-align: left;
  margin-bottom: 58px;
  input {
    display: block;
  }
}
</style>
