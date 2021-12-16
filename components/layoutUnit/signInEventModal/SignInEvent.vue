<template>
  <!-- :cancel-text="'取消'"
    :ok-text="'報名'" -->
  <div>
    <Modal
      :transfer="false"
      :mask-closable="false"
      class="modal"
      v-model="showModal"
      @on-cancel="modalHandler(false)"
      @on-ok="modalHandler(true)"
      :title="`${data.isVolunteerEvent ? '活動報名' : '認捐報名'}`"
    >
      <div class="inputContent">
        <div class="inputTitle">姓名</div>
        <Input
          class="inputContext"
          ref="_userName"
          v-model.trim="name"
          :required="true"
          :placetext="'真實姓名，中文或英文'"
        />
      </div>
      <div class="inputContent">
        <div class="inputTitle">電話</div>
        <Input
          class="inputContext"
          ref="_userTel"
          v-model.trim="tel"
          :type="'tel'"
          :required="true"
          :placetext="'請輸入電話'"
        />
      </div>
      <div class="inputContent" v-if="data.insurance">
        <div class="inputTitle">身分證字號</div>
        <Input
          class="inputContext"
          ref="_idNumber"
          v-model.trim="idNumber"
          :type="'idNumber'"
          :required="true"
          :placetext="'請輸入身分證字號'"
        />
      </div>
      <div class="inputContent">
        <div class="inputTitle">電子信箱</div>
        <Input
          class="inputContext"
          ref="_email"
          v-model.trim="email"
          :type="'email'"
          :required="true"
          :placetext="'請輸入電子信箱'"
        />
      </div>
      <div class="inputContent">
        <div class="inputTitle">生日</div>
        <!-- :listItem="startDate" -->
        <div class="selectContext">
          <Select
            class="select"
            :listKey="'year'"
            :listItem="year"
            @changeHandler="changeHandler"
            :currentSelectObj="birthdaySelect"
          />
          <span>年</span>
          <Select
            class="select"
            :listKey="'month'"
            :listItem="month"
            @changeHandler="changeHandler"
            :currentSelectObj="birthdaySelect"
          />
          <span>月</span>
          <Select
            class="select"
            :listKey="'day'"
            :listItem="day"
            @changeHandler="changeHandler"
            :currentSelectObj="birthdaySelect"
          />
          <span>日</span>
        </div>
      </div>
      <div class="inputContent" v-show="guardianColumnShow">
        <div class="inputTitle">監護人姓名</div>
        <Input
          class="inputContext"
          ref="_guardianName"
          v-model.trim="guardianName"
          :placetext="'真實姓名，中文或英文'"
          :required="true"
        />
      </div>
      <div class="inputContent" v-show="guardianColumnShow">
        <div class="inputTitle">監護人電話</div>
        <Input
          class="inputContext"
          ref="_guardianTel"
          v-model.trim="guardianTel"
          :type="'tel'"
          :placetext="'請輸入電話'"
          :required="true"
        />
      </div>
      <div class="inputContent" v-if="data.isEnterprise">
        <div class="inputTitle">企業代碼</div>
        <Input
          class="inputContext"
          ref="_enterpriseCode"
          v-model.trim="enterpriseCode"
          :required="true"
          :placetext="'企業代碼（必填)'"
        />
      </div>
      <div class="inputContent" v-if="data.isEnterprise">
        <div class="inputTitle">員工編號</div>
        <Input
          class="inputContext"
          ref="_employeeID"
          v-model.trim="employeeID"
          :required="true"
          :placetext="'員工編號（必填)'"
        />
      </div>
      <!-- <div class="inputContent" :class="LocationCheckboxFlag ? 'active' : ''">
        <div class="inputTitle">可服務區域</div>
        <div class="rowContent checkboxGroup">
          <div>
            <input
              :class="LocationCheckboxFlag ? 'checkboxInput active' : ''"
              type="text"
              autocomplete="address-level4"
              @focus="LocationCheckboxFlag = true"
              @blur="locationResult"
              v-model="serviceLoaction"
            />
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
     <div class="inputContent" :class="LocationCheckboxFlag ? 'active' : ''">
        <div class="inputTitle">可服務項目</div>
        <div class="rowContent checkboxGroup">
          <div>
            <input
              :class="skillCheckboxFlag ? 'checkboxInput active' : ''"
              type="text"
              autocomplete="address-level4"
              @focus="skillCheckboxFlag = true"
              @blur="skillResult"
              v-model="serviceSkill"
            />
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
      </div> -->
      <div class="privacContent">
        <div
          class="checkBox"
          @click="
            () => {
              if (privacReaded == false) {
                privacModalFlag = true;
              } else {
                privacReaded = false;
              }
            }
          "
        />
        <img
          class="icon"
          :src="
            privacReaded
              ? require('@/assets/images/other/check_box_select.svg')
              : require('@/assets/images/other/check_box_unselect.svg')
          "
          alt=""
        />
        <div
          class="title"
          @click="
            () => {
              privacModalFlag = true;
            }
          "
        >
          我已詳閱微樂志工服務條款及隱私權政策並同意
        </div>
      </div>

      <div class="footer" slot="footer">
        <button @click="submit" v-prevent-re-click>報名</button>
        <button @click="cancel">取消</button>
      </div>
    </Modal>
    <PrivacyRole
      :modalShow="privacModalFlag"
      @modalHandler="
        (flag) => {
          privacModalFlag = flag;
        }
      "
      @privacOKHandler="privacOKHandler"
      v-prevent-re-click
    />
  </div>
</template>
<script>
import validateMixin from "@/plugins/mixins/validateMixin";
import Input from "@/components/unit/Input.vue";
import articleTypeList from "@/plugins/data/articleSelectData";
import skillSelectData from "@/plugins/data/skillSelectData";
import Select from "@/components/iview/Select.vue";
import PrivacyRole from "@/components/layoutUnit/role/PrivacyRole.vue";
import { mapGetters } from "vuex";

export default {
  props: ["data", "chooseResult"],
  mixins: [validateMixin],
  components: { Input, Select, PrivacyRole },
  computed: {
    ...mapGetters(["profileGetter"]),
    // locationList() {
    //   return articleTypeList.location.filter((item) => {
    //     return item.label !== "縣市";
    //   });
    // },
    // volunteerSkillList() {
    //   return skillSelectData.volunteerSkill;
    // },
    year() {
      let dateOption = [],
        baseDate = 1901;
      for (let i = this.$moment().year(); i >= baseDate; i--) {
        dateOption.push({
          value: i,
          label: i,
        });
      }
      return dateOption;
    },
  },
  watch: {
    // chooseServiceLoaction: {
    //   handler(val) {
    //     if (val && val.length > 3) return;
    //     this.serviceLoaction = this.chooseServiceLoaction.join();
    //   },
    // },
    // serviceLoaction: {
    //   handler() {
    //     if (this.serviceLoaction) {
    //       this.chooseServiceLoaction = this.serviceLoaction.split(",");
    //       this.locationResult();
    //     }
    //   },
    // },
    // chooseServiceSkill: {
    //   handler(val) {
    //     if (val && val.length > 3) return;
    //     this.serviceSkill = this.chooseServiceSkill.join();
    //   },
    // },
    // serviceSkill: {
    //   handler() {
    //     if (this.serviceSkill) {
    //       this.chooseServiceSkill = this.serviceSkill.split(",");
    //       this.skillResult();
    //     }
    //   },
    // },
    birthdaySelect: {
      immediate: true,
      handler() {
        this.guardianColumnShow =
          this.$moment().diff(
            this.$moment(
              `${this.birthdaySelect.year}-${this.birthdaySelect.month}-${this.birthdaySelect.day}`,
              "YYYY-MM-DD"
            ),
            "years"
          ) >= 18
            ? false
            : true;
      },
    },
    "birthdaySelect.year": {
      immediate: true,
      handler(val) {
        this.month = [];
        this.day = [];
        let m = 1,
          d = 1,
          endM = val == this.$moment().year() ? this.$moment().month() + 1 : 12,
          endD = this.$moment(
            `${this.birthdaySelect.year}-${this.birthdaySelect.month}`,
            "YYYY-MM"
          ).daysInMonth();
        // -------make month------
        for (m; m <= endM; m++) {
          this.month.push({
            value: m,
            label: m,
          });
        }
        // -------make day------
        for (d = 1; d <= endD; d++) {
          this.day.push({
            value: d,
            label: d,
          });
        }
      },
    },
    "birthdaySelect.month": {
      handler() {
        this.day = [];
        let d = 1,
          endD = this.$moment(
            `${this.birthdaySelect.year}-${this.birthdaySelect.month}`,
            "YYYY-MM"
          ).daysInMonth();
        // -------make day------
        for (d = 1; d <= endD; d++) {
          this.day.push({
            value: d,
            label: d,
          });
        }
      },
    },
  },
  data() {
    return {
      showModal: true,
      privacModalFlag: false,
      guardianColumnShow: false,
      //---submit data start---
      name: "",
      tel: "",
      idNumber: "",
      email: "",
      guardianName: "",
      guardianTel: "",
      enterpriseCode: "",
      employeeID: "",
      serviceLoaction: "",
      serviceSkill: "",
      privacReaded: false,
      //---submit data end---
      // chooseServiceLoaction: [],
      // LocationCheckboxFlag: false,
      // chooseServiceSkill: [],
      // skillCheckboxFlag: false,

      month: [],
      day: [],
      birthdaySelect: {
        year: this.$moment().year(),
        month: 1,
        day: 1,
        // 預設
        // isEnterprise: "all",
      },
    };
  },
  mounted() {
    window.addEventListener("resize", this.debounce(this.resizeHandler));
    this.resizeHandler();

    if (!this.chooseResult) {
      this.$router
        .replace({ path: "/event/" + this.$route.params.id })
        .catch(() => {});
    }

    let bodyStyle = document.querySelector("body").style;
    bodyStyle.overflow = "hidden";
    if (this.breakPoint >= this.breakPointLarge) {
      bodyStyle.paddingRight = "17px";
    }
  },
  methods: {
    privacOKHandler(val) {
      this.privacReaded = val;
    },
    modalHandler(val) {
      this.$router
        .replace({
          name: "event",
          params: {
            id: this.$route.params.id,
          },
        })
        .catch(() => {});
    },
    // locationResult() {
    //   let result = this.serviceLoaction.split(",").filter(Boolean);
    //   result.splice(3);
    //   this.serviceLoaction = result.join(",");
    // },
    // skillResult() {
    //   let result = this.serviceSkill.split(",").filter(Boolean);
    //   result.splice(3);
    //   this.serviceSkill = result.join(",");
    // },
    changeHandler(item) {
      this.birthdaySelect = Object.assign({}, this.birthdaySelect, {
        [item.tag]: item.value,
      });
    },

    submit() {
      // common 前端資料驗證
      let vailidateData = [
        { name: this.name },
        { tel: this.tel },
        { email: this.email },
      ];
      // common 後端資料
      let postData = {
        id: this.$route.params.id,
        name: this.name,
        phone: this.tel,
        email: this.email,
        birthday: `${this.birthdaySelect.year}-${this.birthdaySelect.month}-${this.birthdaySelect.day}`,
        guardianName: this.guardianName,
        guardianPhone: this.guardianTel,
        // skills: this.serviceSkill,
        //缺可服務區域 this.serviceLoaction
        // 留言
        // note: "",
        // 單選給id(ind)
      };
      // 未滿18需填監護人資料
      if (this.guardianColumnShow) {
        vailidateData.push({ guardianName: this.guardianName });
        vailidateData.push({ guardianPhone: this.guardianTel });
      }
      // 需保險
      if (this.data.insurance) {
        postData = Object.assign({}, postData, {
          securityId: this.idNumber,
        });
        vailidateData.push({ idNumber: this.idNumber });
      }
      // 企業
      if (this.data.isEnterprise) {
        postData = Object.assign({}, postData, {
          employeeSerialNumber: this.employeeID,
          enterpriseSerialNumber: this.enterpriseCode,
        });
        vailidateData.push({ employeeSerialNumber: this.employeeID });
        vailidateData.push({ enterpriseCode: this.enterpriseCode });
      }
      // 報名選項
      if (this.eventSkillIDHandler() !== "noId") {
        postData = Object.assign({}, postData, {
          [`${
            typeof this.eventSkillIDHandler() === "number"
              ? "eventSkillGroupId"
              : "eventSkillGroupList"
          }`]: this.eventSkillIDHandler(),
        });
      }

      this._validate(vailidateData, (pass) => {
        if (!this.privacReaded) {
          this.$Notice.warning({
            title: "您尚未勾選同意隱私權政策",
          });
          return;
        }
        if (pass) {
          this._API.postEventRegister.send([postData]).then((res) => {
            if (!res[0].errors) {
              this.$emit("modalHandler");
              this.$Notice.success({
                title: "報名成功！",
                desc: `麻煩請至報名信箱查看「${
                  this.data.isVolunteerEvent ? "完成報名通知信" : "捐贈通知信"
                }」了解相關資訊`,
                duration: 5,
              });
              this.cancel();
            } else {
              this.errorNotice(res[0].errors[0].error);
            }
          });
        }
      });
    },
    // 活動id處理
    eventSkillIDHandler() {
      let eventSkillID = "";
      if (this.chooseResult) {
        // 單選傳入object
        if (this.chooseResult.id) {
          eventSkillID = this.chooseResult.id;
        } else {
          // 物資id(多個)處理
          if (typeof this.chooseResult == "object") {
            for (let prop in this.chooseResult) {
              eventSkillID += `${this.chooseResult[prop].id}:${this.chooseResult[prop].count},`;
            }
            // 去除字尾 ','
            eventSkillID = eventSkillID.substring(0, eventSkillID.length - 1);
          } else {
            eventSkillID = this.chooseResult;
          }
        }
      }
      return eventSkillID;
    },
    cancel() {
      document.querySelector(".ivu-modal-close").click();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/components/modal/common.scss";
.modal::v-deep {
  .selectContext,
  .inputContext,
  .checkboxGroup {
    width: 100%;
    max-width: 350px;
    @include BreakPointLarge {
      width: 300px;
    }
  }
  .ivu-modal {
    max-width: 350px;
    min-width: 350px;
    @include BreakPointLarge {
      width: 100%;
      max-width: 100%;
    }
  }
  .ivu-modal-wrap {
    justify-content: center;
    @include ForIE {
      justify-content: flex-start;
    }
  }
  .ivu-modal-header-inner {
    font-size: 20px;
  }
  .ivu-modal-body {
    padding-bottom: 0;
  }
  .ivu-modal-footer {
    border: 0;
  }
  .ivu-select {
    width: 100%;
    margin-right: 0;
    border: 1px solid map-get($color, "Gary10");
    border-radius: 4px;
    text-align: center;
  }
  .ivu-select-selected-value {
    color: map-get($color, Black);
  }
  .ivu-select-visible {
    box-shadow: none;
  }
  .ivu-select-selection {
    border: 0;
  }
  .selectContext {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select {
      width: 80px;
    }
    .select:not(:first-child) {
      width: 60px;
    }
  }
  .footer {
    button {
      border: 0;
      padding: 10px 20px;
      background-color: map-get($color, "Orange10");
      color: map-get($color, White);
      border-radius: 50px;
      font-size: 16px;
    }
  }
}

.inputContent {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 20px;
  flex-direction: column;
  font-size: 15px;
  @include ForIE {
    align-items: flex-start;
  }
  &:last-child {
    padding-bottom: 30px;
    border-bottom: 1px solid map-get($color, "Gary10");
  }
  @include BreakPointLarge {
    margin-bottom: 25px;
    flex-direction: row;
  }
  .inputTitle {
    min-width: 90px;
    margin-bottom: 5px;
    margin-left: 5px;
    @include BreakPointLarge {
      margin-bottom: 0;
    }
  }
  .selectContext,
  .inputContext::v-deep {
    position: relative;
    border-radius: 4px;
    input {
      height: 40px;
      border: 1px solid map-get($color, "Gary30") !important;
      width: 100%;
      outline: none;
      border: 0;
      padding: 10px;
      border-radius: 4px;
    }
    .warn {
      left: 13px;
      bottom: -23px;
    }
  }
  .checkboxGroup {
    flex-direction: column;
    justify-content: center;
    .inputTitle {
      display: flex;
      align-self: flex-start;
    }
    input {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: 1px solid map-get($color, "Gary30");
    }
    .checkboxInput {
      &.active {
        border: 1px solid map-get($color, "Gary30");
        border-bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
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
        // width: 382px;
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
      padding: 5px 10px;
    }
  }
}
.privacContent {
  font-size: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    margin-bottom: 3px;
  }
  .checkBox {
    position: absolute;
    left: -10px;
    width: 40px;
    height: 40px;
    @include BreakPointLarge {
      left: 50px;
    }
    @include ForIE {
      top: 0;
    }
  }
  .title {
    margin-left: 10px;
    cursor: pointer;
    color: map-get($color, Blue);
  }
}
</style>
