<template>
  <div class="container">
    <BreadCrumb />
    <div class="editMemgerContainer">
      <div class="editMemgerInfoContent">
        <div class="editMemgerLogo">
          <img
            :src="profile.proLogoPreview.src"
            alt=""
            @error="
              (e) => {
                e.target.src = require('@/assets/images/other/default_userprofile_image.png');
              }
            "
          />
        </div>
        <div class="editPhotoContent">
          <div class="fullBtnStyle editBtn">
            <label for="profileLogoUpload" class="custom-file-upload">
              更換個人照片
            </label>
            <input
              id="profileLogoUpload"
              type="file"
              @change="previewProLogoImage"
              accept="image/jpeg, image/gif, image/png"
              hidden
            />
          </div>
          <div class="placeHodler">
            可以上傳 jpg, gif, png 格式的圖片，且文件小於 2MB
          </div>
        </div>
      </div>
      <div class="infoContent">
        <div class="title">
          <div></div>
          用戶資料
        </div>
        <div class="column">
          <div class="rowTitle">用戶名稱</div>
          <div class="rowContent">
            <input type="text" v-model="profile.name" placeholder="名稱" />
          </div>
        </div>
        <div class="column">
          <div class="rowTitle">電話</div>
          <Input
            class="rowContent"
            ref="_tel"
            :type="'tel'"
            v-model.trim="profile.tel"
          ></Input>
        </div>
        <div class="column">
          <div class="rowTitle">電子信箱</div>
          <Input
            class="rowContent"
            ref="_email"
            :type="'email'"
            v-model.trim="profile.email"
          ></Input>
          <!-- :required="true" -->
        </div>
        <div class="column">
          <div class="rowTitle publicPage">
            公開個人頁
            <div class="checkBoxContent">
              <div
                class="checkBox"
                @click="
                  () => {
                    if (profile.publicProfile == false) {
                      publicProfileModalFlag = true;
                    } else {
                      profile.publicProfile = false;
                    }
                  }
                "
              ></div>
              <img
                class="icon"
                :src="
                  profile.publicProfile
                    ? require('@/assets/images/other/check_box_select.svg')
                    : require('@/assets/images/other/check_box_unselect.svg')
                "
                alt=""
              />
            </div>
          </div>

          <PublicProfileRole
            :modalShow="publicProfileModalFlag"
            @modalHandler="
              (flag) => {
                publicProfileModalFlag = flag;
              }
            "
            @publicProfile="publicProfileHandler"
          />
        </div>

        <div class="column" :class="LocationCheckboxFlag ? 'active' : ''">
          <div class="rowTitle">可服務區域</div>
          <div class="rowContent checkboxGroup">
            <div>
              <input
                :class="LocationCheckboxFlag ? 'checkboxInput active' : ''"
                type="text"
                autocomplete="address-level4"
                @focus="LocationCheckboxFlag = true"
                @blur="locationResult"
                v-model="profile.serviceLoaction"
                readonly="readonly"
              />
              <!-- <span class="roleHint">請以 , 分隔</span> -->
            </div>
            <CheckboxGroup
              v-model="chooseServiceLoaction"
              :class="LocationCheckboxFlag ? 'active' : ''"
            >
              <div class="checkboxTitle">最多複選三個</div>
              <div class="checkboxItemContainer">
                <Checkbox
                  v-for="item of locationList"
                  :key="item.label"
                  :label="item.label"
                  :disabled="
                    chooseServiceLoaction &&
                      chooseServiceLoaction.length >= 3 &&
                      chooseServiceLoaction.indexOf(item.label) < 0
                  "
                />
              </div>
              <div
                class="check fullBtnStyle"
                @click="LocationCheckboxFlag = false"
              >
                確定
              </div>
            </CheckboxGroup>
          </div>
        </div>
        <div class="column" :class="skillCheckboxFlag ? 'active' : ''">
          <div class="rowTitle">可服務項目</div>
          <div class="rowContent checkboxGroup">
            <div>
              <input
                :class="skillCheckboxFlag ? 'checkboxInput active' : ''"
                type="text"
                autocomplete="address-level4"
                @focus="skillCheckboxFlag = true"
                @blur="skillResult"
                v-model="profile.serviceSkill"
                readonly="readonly"
              />
              <!-- <span class="roleHint">請以 , 分隔</span> -->
            </div>
            <CheckboxGroup
              v-model="chooseServiceSkill"
              :class="skillCheckboxFlag ? 'active' : ''"
            >
              <div class="checkboxTitle">最多複選三個</div>
              <div class="checkboxItemContainer">
                <Checkbox
                  v-for="item of volunteerSkillList"
                  :key="item.label"
                  :label="item.label"
                  :disabled="
                    chooseServiceSkill &&
                      chooseServiceSkill.length >= 3 &&
                      chooseServiceSkill.indexOf(item.label) < 0
                  "
                />
              </div>
              <div
                class="check fullBtnStyle"
                @click="skillCheckboxFlag = false"
                v-prevent-re-click
              >
                確定
              </div>
            </CheckboxGroup>
          </div>
        </div>
        <div class="column licenseContainer">
          <div class="rowTitle">專業證照</div>
          <div class="licenseContent">
            <div
              class="imgContext"
              v-for="(item, index) of profile.license"
              :key="index"
            >
              <img
                id="demo"
                class="close"
                src="@/assets/images/other/ic_delete.svg"
                alt=""
                @click="removeLicenseImage(item)"
              /><img class="licensePreview" :src="item.image" alt="" />
            </div>
          </div>
          <div class="rowContent">
            <label class="fullBtnStyle addLicense" for="addLicense">
              新增個人證照
            </label>
            <input
              type="file"
              id="addLicense"
              @change="previewLicenseImage"
              accept="image/jpeg, image/gif, image/png"
              hidden
            />
            <span>可以上傳 jpg, gif, png 格式的圖片，且文件小於 2MB</span>
          </div>
        </div>
        <div class="column alignStart">
          <div class="rowTitle">自我介紹</div>
          <div class="rowContent">
            <textarea
              name="about_me"
              rows="12"
              maxlength="500"
              v-model="profile.aboutMe"
            ></textarea>
            <span>上限 500 字 </span>
          </div>
        </div>
        <div class="row btnContent">
          <button
            class="fullBtnStyle submit"
            @click="editSubmit"
            v-prevent-re-click
          >
            確定
          </button>
          <button
            class="borderBtnStyle cancel"
            @click="editProfileHandler(resetProfile)"
          >
            取消
          </button>
        </div>
      </div>
      <div class="editPasswordContent">
        <div class="title">
          <div></div>
          修改密碼
        </div>
        <div class="column">
          <div class="rowTitle">目前密碼</div>
          <Input
            class="rowContent"
            ref="_currentPassword"
            v-model.trim="currentPassword"
            :type="'password'"
          ></Input>
        </div>
        <div class="column">
          <div class="rowTitle">新密碼</div>
          <Input
            class="rowContent"
            ref="_password"
            v-model.trim="newPassword"
            :type="'rolePassword'"
          ></Input>
        </div>
        <div class="column">
          <div class="rowTitle">新密碼確認</div>
          <Input
            class="rowContent"
            ref="_checkPassword"
            v-model.trim="checkPassword"
            :type="'checkPassword'"
            :placetext="'確認密碼'"
          ></Input>
        </div>
        <div class="row btnContent">
          <button
            class="fullBtnStyle submit"
            @click="editPasswordSubmit"
            v-prevent-re-click
          >
            確定
          </button>
          <button class="borderBtnStyle cancel" @click="resetPasswordHandler">
            取消
          </button>
        </div>
      </div>
      <div class="accountBindContent">
        <div class="title">
          <div></div>
          企業帳號綁定
        </div>
        <div class="column" v-for="(item, index) of npoBindData" :key="index">
          <div class="rowTitle">{{ item.title }}</div>
          <div class="rowContent" v-if="resetProfile[item.type]">
            <span class="bind">已綁定</span>
            <div
              class="bindBtn"
              @click="unbindAccountSubmit(item.type)"
              v-prevent-re-click
            >
              解除綁定
            </div>
          </div>
          <div class="rowContent" v-else>
            <span class="unbind">未綁定</span>
            <router-link
              :to="{
                name: `${item.type == 'isFubon' ? 'bindFubon' : 'bindTWM'}`,
                params: { account: profile.email },
              }"
            >
              前往綁定
            </router-link>
          </div>
        </div>
        <Modal
          class="modal cancelDisplay"
          v-model="unbindAccountModalFlag"
          :ok-text="'確定'"
          :cancel-text="'取消'"
          @on-ok="unbindSubmit"
        >
          <h3>確定要解除綁定？</h3>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import articleTypeList from "@/plugins/data/articleSelectData";
import skillSelectData from "@/plugins/data/skillSelectData";
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";
import PublicProfileRole from "@/components/layoutUnit/role/PublicProfileRole.vue";

export default {
  props: ["route"],
  mixins: [validateMixin],
  components: {
    Input,
    PublicProfileRole,
  },
  computed: {
    locationList() {
      return articleTypeList.location.filter((item) => {
        return item.label !== "縣市";
      });
    },
    volunteerSkillList() {
      return skillSelectData.volunteerSkill;
    },
    ...mapGetters(["profileGetter", "webVisibilityGetter"]),
  },
  data() {
    return {
      resetProfile: {},
      proFileOrgin: {},
      profile: {
        proLogoPreview: {},
        name: "",
        email: "",
        tel: "",
        publicProfile: false,
        serviceLoaction: "",
        serviceSkill: "",
        aboutMe: "",
        license: [],
      },
      chooseServiceLoaction: [],
      LocationCheckboxFlag: false,
      chooseServiceSkill: [],
      skillCheckboxFlag: false,

      recordLicenRemoveID: [],
      currentPassword: "",
      newPassword: "",
      checkPassword: "",
      publicProfileModalFlag: false,
      unbindAccountModalFlag: false,
      unbindType: "",

      npoBindData: [
        { title: "富邦集團員工", type: "isFubon" },
        { title: "台灣大哥大員工", type: "isTwm" },
      ],
      reloadFlag: false,
    };
  },
  watch: {
    route: {
      immediate: true,
      handler() {
        if (
          this.route.from.name === "bindFubon" ||
          this.route.from.name === "bindTWM"
        )
          this.getUsersData("reload");
      },
    },
    profileGetter: {
      immediate: true,
      handler() {
        if (!this.reloadFlag) this.getUsersData();
      },
    },
    webVisibilityGetter: {
      handler(flag) {
        if (flag) {
          this.getUsersData("reload");
        }
      },
    },
    chooseServiceLoaction: {
      handler(val) {
        if (val && val.length > 3) return;
        this.profile.serviceLoaction = this.chooseServiceLoaction.join();
        if (this.profile.serviceLoaction.indexOf(",") === 0) {
          this.profile.serviceLoaction = this.profile.serviceLoaction.substr(1);
        }
      },
    },
    "profile.serviceLoaction": {
      handler() {
        this.chooseServiceLoaction = this.profile.serviceLoaction
          .replace(/\s*/g, "")
          .split(",");
        this.locationResult();
      },
    },
    chooseServiceSkill: {
      handler(val) {
        if (val && val.length > 3) return;
        this.profile.serviceSkill = this.chooseServiceSkill.join();
        if (this.profile.serviceSkill.indexOf(",") === 0) {
          this.profile.serviceSkill = this.profile.serviceSkill.substr(1);
        }
      },
    },
    "profile.serviceSkill": {
      handler() {
        this.chooseServiceSkill = this.profile.serviceSkill
          .replace(/\s*/g, "")
          .split(",");
        this.skillResult();
      },
    },
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
  },
  methods: {
    async getUsersData(reload) {
      let userData = {};
      if (this.profileGetter) {
        if (reload) {
          this.reloadFlag = true;
          await this._API.getProfile.send().then((res) => {
            this.$store.dispatch("setProfile", res);
            userData = res;
          });
        } else {
          userData = JSON.parse(JSON.stringify(this.profileGetter));
        }
        await this._API.getLicenseImage.send().then((res) => {
          userData = Object.assign({}, userData, {
            licenseImages: res.results,
          });
        });
        this.editProfileHandler(userData);
      } else {
        if (!localStorage.getItem("accessToken")) {
          this.$router.replace({ name: "home" }).catch(() => {});
        }
      }
    },
    // 資料渲染
    editProfileHandler(res) {
      if (typeof res == "string") {
        res = JSON.parse(res);
      }
      this.profile.proLogoPreview.src = res.icon;
      this.profile.name = res.name;
      this.profile.tel = res.phone;
      this.profile.email = res.email;
      this.profile.publicProfile = res.public;
      this.profile.serviceLoaction = res.interest;
      this.profile.serviceSkill = res.skillsDescription;
      this.profile.license = res.licenseImages || [];
      this.profile.aboutMe = res.aboutMe;

      this.resetProfile = JSON.parse(JSON.stringify(res));
      this.proFileOrgin = JSON.stringify(this.profile);
    },
    locationResult() {
      let result = this.profile.serviceLoaction
        .replace(/\s+/g, "")
        .split(",")
        .filter(Boolean);
      result.splice(3);
      this.profile.serviceLoaction = result.join(",");
    },
    skillResult() {
      let result = this.profile.serviceSkill
        .replace(/\s+/g, "")
        .split(",")
        .filter(Boolean);
      result.splice(3);
      this.profile.serviceSkill = result.join(",");
    },
    publicProfileHandler(val) {
      this.profile.publicProfile = val;
    },
    // 預覽大頭照
    previewProLogoImage(event) {
      var input = event.target;
      if (input.files && this.sizeCheck(input.files[0])) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.$set(this.profile.proLogoPreview, "src", e.target.result);
          this.$set(this.profile.proLogoPreview, "file", input.files[0]);
          this.$forceUpdate();
          this.uploadProfileLogo();
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        document.getElementById("profileLogoUpload").value = null;
      }
    },
    // 預覽證照
    previewLicenseImage(event) {
      var input = event.target;
      if (input.files && this.sizeCheck(input.files[0])) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.profile.license.push({
            image: e.target.result,
            file: input.files[0],
          });
          document.getElementById("addLicense").value = null;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        document.getElementById("addLicense").value = null;
      }
    },
    sizeCheck(file) {
      if (Math.floor(file.size / 1024 / 1024).toFixed(4) <= 2) {
        return true;
      } else {
        this.$Notice.warning({
          title: "檔案大於2MB,請重新上傳!",
          duration: 3,
        });
        return false;
      }
    },
    // 移除證照
    removeLicenseImage(item) {
      let removed = false;
      if (this.recordLicenRemoveID.length == 0) {
        removed = false;
      } else {
        this.recordLicenRemoveID.forEach((res) => {
          if (res === item.licenseId) removed = true;
        });
      }
      if (item.licenseId && !removed) {
        this.recordLicenRemoveID.push(item.licenseId);
      }
      this.profile.license.splice(this.profile.license.indexOf(item), 1);
    },
    // API上傳大頭照
    async uploadProfileLogo() {
      if (this.profile.proLogoPreview.src === this.resetProfile.icon) return;
      // 大頭照移除
      this._API.deleteProfileLogo.requestCommon(this.profileGetter.id, "icon");
      await this._API.deleteProfileLogo.fileUpload({
        id: this.profileGetter.id,
        type: "icon",
      });

      // 大頭照上傳
      this._API.putProfileLogo.requestCommon(this.profileGetter.id, "icon");
      await this._API.putProfileLogo
        .fileUpload({
          id: this.profileGetter.id,
          type: "icon",
          image: this.profile.proLogoPreview.file,
        })
        .then((data) => {
          if (data.error) {
            this.errorNotice(data.error);
            return;
          }
          this.profile.proLogoPreview.src = data.url;
          // 更換header大頭照
          this._API.getProfile.send().then((profile) => {
            this.$store.dispatch("setProfile", profile);
          });
          document.getElementById("profileLogoUpload").value = null;
        });
    },
    // API上傳證照
    async uploadLicense() {
      // 移除
      let orgin = JSON.parse(this.proFileOrgin).license;
      for (let orginIndex in orgin) {
        for (let recordLicenRemoveIDIndex in this.recordLicenRemoveID) {
          if (
            orgin[orginIndex].licenseId ===
            this.recordLicenRemoveID[recordLicenRemoveIDIndex]
          ) {
            this._API.deleteProfileLogo.requestCommon(
              orgin[orginIndex].licenseId,
              "license"
            );
            await this._API.deleteProfileLogo
              .fileUpload({
                id: this.recordLicenRemoveID[recordLicenRemoveIDIndex],
                type: "license",
              })
              .then((data) => {
                if (data.error) {
                  this.errorNotice(data.error);
                  return;
                }
              });
          }
        }
      }

      // 上傳
      for (let i in this.profile.license) {
        if (
          this.profile.license[i] &&
          this.profile.license[i].hasOwnProperty("file")
        ) {
          this._API.putProfileLogo.requestCommon(
            this.profileGetter.id,
            "license"
          );
          await this._API.putProfileLogo
            .fileUpload({
              id: this.profileGetter.id,
              type: "license",
              image: this.profile.license[i].file,
            })
            .then((data) => {
              if (data.error) {
                this.errorNotice(data.error);
                return;
              }
            });
        }
      }
    },
    // submit個資
    editSubmit() {
      if (JSON.stringify(this.profile) === this.proFileOrgin) {
        this.$Notice.warning({
          title: "無任何修改!",
          duration: 3,
        });
        return;
      }
      // email必填驗證
      // this._validate([{ email: this.profile.email }], (pass) => {
      // if (pass) {
      let sumbit = () => {
        this._API.editProfile
          .send([
            {
              username: this.resetProfile.username,
              name: this.profile.name,
              phone: this.profile.tel,
              email: this.profile.email,
              public: this.profile.publicProfile,
              interest: this.profile.serviceLoaction,
              skillsDescription: this.profile.serviceSkill,
              aboutMe: this.profile.aboutMe,
            },
          ])
          .then((res) => {
            if (!res[0].errors) {
              this.$Notice.success({
                title: "編輯成功!",
                duration: 3,
              });
              this.getUsersData("reload");
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              this.errorNotice(res[0].errors[0].error);
            }
          });
      };
      this.uploadLicense().then(() => {
        sumbit();
      });
      // } else {
      //   this.$Notice.warning({
      //     title: `請輸入電子信箱!`,
      //     duration: 3,
      //   });
      //   window.scrollTo({ top: 0, behavior: "smooth" });
      // }
      // });
    },
    // 密碼欄清空
    resetPasswordHandler() {
      this.currentPassword = "";
      this.newPassword = "";
      this.checkPassword = "";
    },
    // submit密碼修改
    editPasswordSubmit() {
      // 未填提示
      if (this.$refs._password._props.value) {
        let hint = "";
        if (
          !this.$refs._currentPassword._props.value &&
          !this.$refs._checkPassword._props.value
        ) {
          hint = "舊密碼、確認密碼";
        } else if (!this.$refs._currentPassword._props.value) {
          hint = "舊密碼";
        } else if (!this.$refs._checkPassword._props.value) {
          hint = "確認密碼";
        }
        if (hint) {
          this.$Notice.warning({
            title: `請輸入${hint}`,
            duration: 3,
          });
          return;
        }
      } else {
        this.$Notice.warning({
          title: `請輸入密碼`,
          duration: 3,
        });
        return;
      }
      // 送出
      this._validate(
        [{ password: this.newPassword }, { checkPassword: this.checkPassword }],
        (pass) => {
          if (pass) {
            this._API.patchCurrentUserPassword
              .send({
                oldPassword: this.currentPassword,
                newPassword: this.newPassword,
              })
              .then((res) => {
                if (!res.error) {
                  this.$Notice.success({
                    title: "修改密碼成功!",
                    duration: 3,
                  });
                  this.resetPasswordHandler();
                } else {
                  this.errorNotice(res.error);
                }
              });
          }
        }
      );
    },

    // 解除綁定Modal控制 / 紀錄nubind type
    unbindAccountSubmit(val) {
      this.unbindAccountModalFlag = true;
      this.unbindType = val;
    },
    // 解除綁定submit
    unbindSubmit() {
      this.unbindAccountModalFlag = false;
      this._API[`${this.unbindType == "isFubon" ? "unbindFubon" : "unbindTWM"}`]
        .send()
        .then((res) => {
          if (!res.errors) {
            this.getUsersData("reload");
            //成功
            this.$Notice.success({
              title: "已解除綁定!",
              duration: 3,
            });
          } else {
            this.errorNotice(res.errors[0].error);
          }
        });
    },
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/components/modal/common.scss";
$rowTitleWidth: 100px;
.editMemgerContainer {
  width: 100%;
  max-width: $MobileMaxWidth;
  padding: 10px 16px;
  margin: 0 auto;
  @include BreakPointLarge {
    max-width: $ContainerMaxWidth;
    padding: 0;
  }
  .editMemgerInfoContent,
  .infoContent,
  .editPasswordContent,
  .accountBindContent {
    display: flex;
    padding-bottom: 20px;
  }
  > div:not(:last-child) {
    border-bottom: 1px solid map-get($color, "Gary50");
  }
  .editMemgerInfoContent {
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    .editMemgerLogo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 180px;
      > img {
        max-height: 100%;
        max-width: 100%;
      }
    }
    .editPhotoContent {
      flex-basis: 50%;
      margin-left: 10px;
      .editBtn {
        margin: 10px 0 20px;
        .custom-file-upload {
          padding: 10px 29px;
        }
      }
      .placeHodler {
        font-size: 16px;
        color: map-get($color, "Gary40");
      }
    }
  }

  .accountBindContent,
  .editPasswordContent::v-deep,
  .infoContent::v-deep {
    padding-top: 20px;
    flex-direction: column;
    align-items: flex-start;
    background: map-get($color, White);
    width: 100%;
    .title {
      display: flex;
      text-align: left;
      font-size: 20px;
      line-height: 25px;
      font-weight: bold;
      color: map-get($color, "Black10");
      margin-bottom: 20px;
      div {
        width: 4px;
        margin-right: 10px;
        border-radius: 2px;
        background-color: map-get($color, "Orange10");
      }
    }
    input,
    textarea {
      width: 100%;
      border: 1px solid map-get($color, "Gary30");
      padding: 14px 20px;
      border-radius: 4px;
      font-size: 16px;
    }
    .row {
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      button {
        flex-basis: calc(50% - 5px);
        &:first-child {
          margin-right: 7px;
        }
        &:last-child {
          margin-left: 7px;
        }
      }
    }
    .column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 30px;
      @include BreakPointLarge {
        flex-direction: row;
        align-items: center;
        @include ForIE {
          display: inline-block;
        }
        &.licenseContainer {
          flex-direction: column;
          align-items: flex-start;
        }
        &.active {
          align-items: baseline;
        }
      }
      .rowTitle {
        font-size: 16px;
        color: map-get($color, "Gary40");
        margin-bottom: 10px;
        @include BreakPointLarge {
          flex-basis: $rowTitleWidth;
          margin: 0;
        }
        &.publicPage {
          display: flex;
          flex-direction: row;
          align-content: center;
          input {
            width: auto;
            margin: 4px 0 0 10px;
          }
          @include BreakPointLarge {
            position: relative;
            input {
              position: absolute;
              left: calc(#{$rowTitleWidth} - 10px);
            }
          }
        }
      }

      .rowContent {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        span {
          align-self: center;
          margin: 10px 0 10px 3px;
          color: map-get($color, "Gary40");
          &.warn {
            color: red;
            margin: 0;
            bottom: -23px;
          }
        }

        input[type="file"],
        textarea {
          width: 100%;
        }
        @include BreakPointLarge {
          flex: 1;
          flex-wrap: nowrap;
          input {
            width: 382px;
          }
          span {
            margin-left: 10px;
          }
        }
      }
      .checkBoxContent {
        position: relative;
        right: -20px;
        top: 3px;
        .checkBox {
          position: absolute;
          width: 40px;
          height: 40px;
          top: -10px;
          left: -10px;
        }
      }
      .addLicense {
        margin: 10px 0 20px;
        text-align: center;
        padding: 10px 30px;
      }
      &.licenseContainer {
        @include BreakPointLarge {
          .rowTitle {
            flex-basis: auto;
          }
          .rowContent {
            flex-wrap: wrap;
            .addLicense {
              margin: 20px 0 15px 0;
            }
            span {
              width: 100%;
              margin: 0;
            }
          }
        }
      }
      .licenseContent {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 10px;
        width: 100%;
        @include BreakPointLarge {
        }
        > .imgContext {
          position: relative;
          width: calc(100% / 2 - 20px);
          height: 200px;
          text-align: center;
          margin: 0 10px;
          @include BreakPointLarge {
            width: 200px;
          }
          &:nth-child(2n + 1) {
            margin-right: 10px;
            margin-bottom: 10px;
          }
          &:nth-child(2n + 2) {
            margin-bottom: 10px;
            @include BreakPointLarge {
              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }
          .close {
            display: inline;
            width: 24px;
            height: 24px;
            position: absolute;
            right: 0;
          }
          .licensePreview {
            max-height: 100%;
            max-width: 100%;
            min-height: auto;
          }
        }
      }
      @include BreakPointLarge {
        &.alignStart {
          align-items: flex-start;
          .rowTitle {
            margin-top: 10px;
          }
          .rowContent {
            flex-direction: column;
            span {
              width: 100%;
              text-align: left;
            }
          }
        }
      }
    }
    .btnContent {
      @include BreakPointLarge {
        justify-content: center;
        .submit,
        .cancel {
          flex-basis: auto;
          padding: 10px 40px;
        }
      }
    }
    .checkboxGroup {
      flex-direction: column;
      justify-content: center;
      .checkboxInput {
        &.active {
          border: 1px solid map-get($color, "Gary30");
          border-bottom: 0;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      .checkboxItemContainer {
        margin-left: 60px;
        @include BreakPointMinSmall {
          margin-left: 30px;
        }
      }
      .roleHint {
        position: absolute;
        right: 14px;
        top: 13px;
        @include BreakPointLarge {
          position: relative;
          right: 4px;
          top: 0;
        }
      }
      .check {
        padding: 7px 40px;
        margin-top: 20px;
      }
      .ivu-checkbox-group {
        display: none;
        justify-content: center;
        width: 100%;
        flex-wrap: wrap;
        padding: 0 10px 10px;
        &.active {
          display: flex;
          border: 1px solid map-get($color, "Gary30");
          border-top: 0;
          border-radius: 0 0 4px 4px;
          .checkboxTitle {
            border-top: 1px solid map-get($color, "Gary30");
            font-size: 16px;
            width: 100%;
            padding: 20px 0;
            text-align: center;
          }
        }
        @include BreakPointLarge {
          width: 382px;
        }
        .ivu-checkbox-wrapper {
          margin: 0;
        }
        .ivu-checkbox {
          margin: 3px !important;
        }
        .ivu-checkbox-inner {
          margin: 0 !important;
        }
        .ivu-checkbox-group-item {
          width: 45%;
        }
        .ivu-checkbox-input {
          width: auto !important;
        }
      }
    }
  }
  .accountBindContent {
    .column {
      .rowContent {
        display: flex;
        align-items: center;
        .bind,
        .unbind,
        a {
          margin-right: 30px;
          font-size: 18px;
          font-weight: 500;
        }
        .bind {
          color: map-get($color, Green);
        }
        .unbind {
          color: map-get($color, Red);
        }
        .bindBtn,
        a {
          cursor: pointer;
          text-decoration: underline;
          font-weight: 500;
          color: map-get($color, Blue);
          font-size: 18px;
        }
      }
      @include BreakPointLarge {
        .rowTitle {
          flex-basis: calc(#{$rowTitleWidth} + 20px);
        }
      }
    }
  }
  .fullBtnStyle {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: map-get($color, White);
    border: 0;
    background-image: linear-gradient(
      to right,
      map-get($color, "Orange10"),
      map-get($color, "Orange20")
    );
    border-radius: 25px;
    padding: 10px 0;
    line-height: 15px;
  }
  .borderBtnStyle {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    border: 1px solid map-get($color, "Orange10") !important;
    color: map-get($color, "Orange10");
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    background-color: map-get($color, White);
    line-height: 15px;
  }
}
// }
</style>
