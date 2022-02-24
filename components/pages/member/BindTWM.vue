<template>
  <div class="container">
    <div class="loginWrapper">
      <div class="titileContainer">
        <img class="logo" src="@/assets/images/login/ic_twm.png" alt="" />
        <div class="title">
          我是台灣大哥大員工
        </div>
      </div>
      <div class="formContainer">
        <div class="inputContainer">
          <Icon type="md-person" class="icon" />
          <Input
            class="orangeBorder"
            ref="_userName"
            v-model.trim="name"
            :required="true"
            :placetext="'真實姓名，中文或英文'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="ios-mail" class="icon" />
          <Input
            class="orangeBorder"
            ref="_email"
            v-model.trim="email"
            :type="'email'"
            :required="true"
            :placetext="'電子信箱'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="md-person" class="icon" />
          <Input
            class="orangeBorder"
            ref="_employeeID"
            v-model.trim="enterpriseSerialNumber"
            :required="true"
            :placetext="'員工編號'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="ios-card-outline" class="icon" />

          <Input
            class="orangeBorder"
            ref="_idNumber"
            v-model.trim="idNumber"
            :type="'idNumber'"
            :required="true"
            :placetext="'身分證字號'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="ios-phone-portrait" class="icon" />
          <Input
            class="orangeBorder"
            ref="_tel"
            v-model.trim="tel"
            :type="'tel'"
            :required="true"
            :placetext="'電話'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="ios-people" class="icon" />
          <Input
            class="orangeBorder"
            ref="_department"
            v-model.trim="department"
            :required="true"
            :placetext="'部門'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="md-podium" class="icon" />
          <Input
            class="orangeBorder"
            ref="_company"
            v-model.trim="company"
            :required="true"
            :placetext="'公司別'"
          />
        </div>
        <div class="inputContainer">
          <Icon type="md-people" class="icon" />
          <Input
            class="orangeBorder"
            ref="_corporateVolunteerGroup"
            v-model.trim="corporateVolunteerGroup"
            :required="true"
            :placetext="'企業志工分組'"
          />
        </div>
        <!-- <div class="inputContainer">
          <Icon type="md-lock" class="icon" />
          <Input
            class="orangeBorder password"
            ref="_password"
            v-model.trim="password"
            :type="'password'"
            :required="true"
          ></Input>
        </div> -->
        <button
          class="orangeFullColorBtn"
          @click="bindSubmit"
          v-prevent-re-click
        >
          確定
        </button>
        <router-link class="orangeBorderBtn" :to="{ name: 'meEdit' }"
          >取消</router-link
        >
      </div>
    </div>
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
      name: "",
      email: "",
      enterpriseSerialNumber: "",
      idNumber: "",
      tel: "",
      department: "",
      company: "",
      corporateVolunteerGroup: "",
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    // if (this.$route.params.account) {
    //   this.account = this.$route.params.account;
    // }
  },
  methods: {
    bindSubmit() {
      this._validate(
        [
          { enterpriseSerialName: this.name },
          { enterpriseSerialEmail: this.email },
          { enterpriseSerialNumber: this.enterpriseSerialNumber },
        ],
        (pass) => {
          if (pass) {
            let postData = {
              enterpriseSerialName: this.name,
              enterpriseSerialEmail: this.email,
              enterpriseSerialNumber: this.enterpriseSerialNumber,
              enterpriseSerialDepartment: this.department + "",
              enterpriseSerialId: this.idNumber + "",
              enterpriseSerialPhone: this.tel + "",
              enterpriseSerialType: this.company + "",
              enterpriseSerialGroup: this.corporateVolunteerGroup + "",
            };
            this._API.bindTWM.send(postData).then((res) => {
              if (!res.errors) {
                //成功
                this.$Notice.success({
                  title: "綁定成功!",
                  duration: 3,
                });
                this.$router.replace({
                  name: "meEdit",
                });
              } else {
                if (res.errors[0].error === "userNotFound") {
                  res.errors[0].error = "twm_userNotFound";
                }
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
      &:nth-child(8) {
        margin-bottom: 40px;
      }
    }
  }
}
</style>
