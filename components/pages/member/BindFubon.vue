<template>
  <div class="container">
    <div class="loginWrapper">
      <div class="titileContainer">
        <img class="logo" src="@/assets/images/login/ic_fubon.svg" alt="" />
        <div class="title">
          富邦愛心志工社會員綁定
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-person" class="icon" />
          <Input
            class="blueBorder"
            ref="_email"
            v-model.trim="account"
            :type="'email'"
            :required="true"
          ></Input>
        </div>
        <div class="inputContainer">
          <Icon type="md-lock" class="icon" />
          <Input
            class="blueBorder password"
            ref="_password"
            v-model.trim="password"
            :type="'password'"
            :required="true"
          ></Input>
        </div>
        <button class="blueFullColorBtn" @click="bindSubmit" v-prevent-re-click>
          確定
        </button>
        <router-link class="blueBorderBtn" :to="{ name: 'meEdit' }"
          >取消</router-link
        >
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
      account: null,
      password: null,
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("loginLoading")[0].style.display = "none";
    // if (this.$route.params.account) {
    //   this.account = this.$route.params.account;
    // }
  },
  methods: {
    bindSubmit() {
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
            this._API.bindFubon.send(postData).then((res) => {
              if (!res.errors) {
                //成功
                this.$Notice.success({
                  title: "綁定成功!",
                  duration: 3,
                });
                this.$router
                  .replace({
                    name: "meEdit",
                  })
                  .catch(() => {});
              } else {
                document.getElementsByClassName(
                  "loginLoading"
                )[0].style.display = "none";
                this.errorNotice(res.errors[0].error);
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
    .inputContainer {
      .password {
        margin-bottom: 77px;
      }
    }
  }
}
</style>
