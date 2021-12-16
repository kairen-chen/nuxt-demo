<template>
  <div class="container">
    <div class="loginWrapper">
      <div class="titileContainer">
        <div class="orangeTitle">
          註冊
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
            :disabled="disabled"
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
            :type="'rolePassword'"
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
            class="orangeBorder chcekPassword"
            ref="_checkPassword"
            v-model.trim="checkPassword"
            :type="'checkPassword'"
            :required="true"
            :placetext="'確認密碼'"
          ></Input>
        </div>
        <div class="privacyRoleContainer">
          <div class="checkBox" @click="privacReaded = !privacReaded"></div>
          <img
            class="icon"
            :src="
              privacReaded
                ? require('@/assets/images/other/check_box_select.svg')
                : require('@/assets/images/other/check_box_unselect.svg')
            "
            alt=""
          />
          <a @click.prevent="modalShow = true">
            我已詳閱微樂志工服務條款及隱私權政策並同意
          </a>
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
    <PrivacyRole
      :modalShow="modalShow"
      @modalHandler="
        (flag) => {
          modalShow = flag;
        }
      "
    />
    <div class="loginLoading"></div>
  </div>
</template>
<script>
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";
import PrivacyRole from "@/components/layoutUnit/role/PrivacyRole.vue";
export default {
  mixins: [validateMixin],
  components: { Input, PrivacyRole },
  props: ["route"],
  data() {
    return {
      account: null,
      password: null,
      checkPassword: null,
      privacReaded: true,
      disabled: false,
      modalShow: false,
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("loginLoading")[0].style.display = "none";
    if (this.$route.params.account) {
      this.account = this.$route.params.account;
      // 有回傳email(username)則代入後不可修改
      if (
        this.route.from &&
        this.route.from.fullPath.search(/twmcallback|loginFubon/) > 0
      ) {
        this.disabled = true;
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.privacReaded) {
        this._validate(
          [
            { account: this.account },
            { rolePassword: this.password },
            { checkPassword: this.checkPassword },
          ],
          (pass) => {
            if (pass) {
              document.getElementsByClassName("loginLoading")[0].style.display =
                "block";
              let data = {
                username: this.account,
                firstName: "",
                lastName: "",
                email: this.account,
                password: this.password,
              };
              // 富邦.台哥大登入後註冊微樂
              if (this.$route.params.accessCode) {
                data = Object.assign({}, data, {
                  accessCode: this.$route.params.accessCode,
                });
              }
              this._API.registAccount.send([data]).then((res) => {
                let token = res[0].token;
                // 過了直接跳登入
                if (token) {
                  this.$store.dispatch("delToken");
                  this.$store
                    .dispatch("setToken", {
                      accessToken: token.accessToken,
                      refreshToken: token.refreshToken,
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
                          .then(() => {
                            this.$Notice.success({
                              title: "註冊成功!",
                              duration: 3,
                            });
                          });
                      });
                    });
                  if (
                    this.$route.params.accessCode &&
                    this.route.from.name === "loginFubon" &&
                    res.token.bind
                  ) {
                    this.$Notice.success({
                      title: "您的帳號已成功綁定富邦企業帳號！",
                    });
                  }
                } else {
                  document.getElementsByClassName(
                    "loginLoading"
                  )[0].style.display = "none";
                  // 200錯誤處理
                  let error = res[0].errors[0].error;
                  this.errorNotice(error);
                }
              });
            }
          }
        );
      } else {
        this.$Notice.warning({
          title: "請同意服務條款",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
.privacyRoleContainer {
  display: flex;
  align-items: baseline;
  margin-bottom: 58px;
  position: relative;
  a {
    margin-left: 20px;
  }
  .checkBox {
    position: absolute;
    left: -10px;
    top: -10px;
    width: 35px;
    height: 40px;
  }
}
</style>
