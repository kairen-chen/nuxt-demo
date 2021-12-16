<template>
  <div class="container">
    <BreadCrumb />
    <div class="content-event">
      <h1>我要成為夥伴</h1>
      <div class="detailContainer">
        <div class="detailcontent">
          <div class="title">我也想要加入微樂志工平台成為夥伴之一</div>
          <div class="inputContent">
            <div class="inputTitle">微樂帳號</div>
            <Input
              class="inputContext"
              ref="_email"
              v-model.trim="account"
              :type="'email'"
              :required="true"
            ></Input>
          </div>
          <div class="inputContent">
            <div class="inputTitle">組織名稱</div>
            <Input
              class="inputContext"
              ref="_organization"
              v-model.trim="organizationName"
              :required="true"
              :placetext="'請填寫組織全名'"
            ></Input>
          </div>
          <div class="typeCotent">
            <div>
              <input
                type="radio"
                id="npo"
                name="org_type"
                value="npo"
                v-model="organizationType"
              />
              <label for="npo">NPO / 團體機關</label>
            </div>
            <div>
              <input
                type="radio"
                id="enterprise"
                name="org_type"
                value="enterprise"
                v-model="organizationType"
              />
              <label for="enterprise">企業</label>
            </div>
          </div>
          <div class="submitContent">
            <div
              v-if="submitFlag"
              class="submit"
              @click="submit"
              v-prevent-re-click
            >
              確定送出
            </div>
            <div v-else class="submit">請稍後</div>
          </div>
        </div>
        <div class="detailcontent">
          <div class="title">親愛的志工團隊您好：</div>
          <p class="content">
            微樂志工為您做最佳活動推廣服務。
            無論何時，志工們都能隨時使用本站參加到您的活動！
            如您希望能將您的招募活動上架於
            微樂志工平台，請填妥左邊資料，我們將盡快與您聯繫。
          </p>
        </div>
      </div>
      <div class="joinContainer">
        <img src="https://www.isharing.tw/static/images/join_2.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";
import { mapGetters } from "vuex";
export default {
  mixins: [validateMixin],
  components: { Input },
  computed: {
    ...mapGetters(["profileGetter"]),
  },
  watch: {
    profileGetter: {
      immediate: true,
      handler() {
        if (this.profileGetter) {
          this.account = this.profileGetter.username;
          this.userId = this.profileGetter.id;
        } else {
          this.$router.replace({ name: "login" }).catch(() => {});
        }
      },
    },
  },
  data() {
    return {
      account: "",
      organizationName: "",
      organizationType: "npo",
      userId: "",
      submitFlag: true,
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
  },
  methods: {
    submit() {
      this._validate(
        [{ user: this.account }, { organizationName: this.organizationName }],
        (pass) => {
          if (pass) {
            // 成為夥伴
            this._API.postNpos
              .send([
                {
                  userId: this.userId,
                  contactEmail: this.account,
                  name: this.organizationName,
                  enterprise:
                    this.organizationType === "enterprise" ? true : false,
                  description: "",
                  registerNumber: "",
                  serialNumber: "",
                  serviceTarget: "",
                  contactName: "",
                  contactPhone: "",
                  contactJob: "",
                  contact2Name: "",
                  contact2Phone: "",
                  contact2Email: "",
                  contact2Job: "",
                  contactAddress: "",
                  contactWebsite: "",
                  contactSite: "",
                  youtubeCode: "",
                  inventory: false,
                  promote: "",
                },
              ])
              .then((res) => {
                if (res[0].id) {
                  this.$router
                    .replace({ name: "footerJoinSuccess" })
                    .then(() => {
                      this.$Notice.success({
                        title: "請前往E-mail收通知信!",
                        duration: 3,
                      });
                    })
                    .catch(() => {});
                } else {
                  this.errorNotice(res[0].errors[0].error);
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
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/page/footer/common.scss";
h1 {
  text-align: center;
  color: map-get($color, "Orange10");
}
.detailContainer {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  .detailcontent {
    width: 100%;
    padding: 0 10px 20px;
    &:not(:last-child) {
      border-bottom: 1px solid map-get($color, "Gary20");
      margin-bottom: 20px;
    }
    @include BreakPointLarge {
      padding: 20px;
      &:not(:last-child) {
        border-bottom: 0;
      }
      &:last-child {
        border-left: 1px solid map-get($color, "Gary20");
      }
    }
    .inputContent {
      display: flex;
      justify-self: flex-start;
      align-items: center;
      margin: 20px 0 25px 0;
      .inputTitle {
        flex-basis: 80px;
        margin-right: 20px;
        @include BreakPointLarge {
          margin-right: 0;
        }
      }
      .inputContext::v-deep {
        position: relative;
        padding: 10px 15px;
        width: 100%;
        border: 1px solid map-get($color, "Gary30");
        border-radius: 4px;
        font-size: 16px;
        max-width: 300px;
        @include BreakPointLarge {
          width: 300px;
        }
        input {
          width: 100%;
        }
        .warn {
          bottom: -23px;
        }
      }
    }
    .typeCotent {
      display: flex;
      flex-direction: column;
      margin-left: 100px;
      > div {
        margin-bottom: 10px;
      }
    }
    .content {
      margin-top: 20px;
    }
    .submitContent {
      width: 100%;
      text-align: center;
      @include BreakPointLarge {
        text-align: right;
      }
      .submit {
        display: inline-block;
        padding: 10px 20px;
        background-color: map-get($color, "Orange10");
        color: map-get($color, White);
        border-radius: 50px;
        margin-top: 20px;
        line-height: 15px;
        @include BreakPointLarge {
          margin: 0 40px 0;
        }
      }
    }
  }
  @include BreakPointLarge {
    flex-direction: row;
    .detailcontent {
      width: 50%;
    }
  }
}
.joinContainer {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
  }
}
</style>
