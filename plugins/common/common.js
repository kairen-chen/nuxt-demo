import UnderConstruction from "@/components/unit/UnderConstruction.vue";
import Breadcrumb from "@/components/iview/Breadcrumb.vue";
import moment from "moment";
import "./IEPolyfill";
import { breakPointLarge } from "@/assets/scss/common/_rwd.scss";

if (process.client) {
  Window.TO_PAGE_FLAG = true;
}

const LogPlugin = {
  install(Vue) {
    // --------Global prototype start--------
    Vue.prototype._moment = moment;
    Vue.prototype._API = service;
    Vue.prototype._redirect = (url, target) => {
      window.open(url, target ? "_self" : "_blank");
    };
    // --------Global prototype end--------

    // --------Global component start--------
    // 網頁建構中圖示(三角雖)
    Vue.component("UnderConstruction", UnderConstruction);
    // 麵包屑
    Vue.component("BreadCrumb", Breadcrumb);
    // --------Global component end--------

    // --------Global directive start--------
    // 防止重複submit
    Vue.directive("preventReClick", {
      inserted(el, binding) {
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              el.disabled = false;
            }, binding.value || 1500);
          }
        });
      },
    });
    // --------Global directive end--------

    // --------Global mixin start--------
    Vue.mixin({
      data() {
        return {
          breakPointLarge: parseInt(breakPointLarge, 10),
          breakPoint: 0,
        };
      },
      beforeDestroy() {
        window.removeEventListener("resize", this.resizeHandler);
      },
      methods: {
        resizeHandler() {
          if (!process.client) return;
          this.breakPoint = window.innerWidth;
        },
        debounce(func, delay = 300) {
          let timer = null;
          return () => {
            let context = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
              func.apply(context, args);
            }, delay);
          };
        },
        _imageLoadError(src) {
          // console.warn("@@@@ Image Err ->", src);
        },
        // 取得網址參數
        // use -> this.geturlpara(window.location.href).state
        geturlpara(url) {
          let geturl = url.split("?")[1].split("&"),
            obj = {};
          geturl.forEach((value, index) => {
            obj[value.split("=")[0]] = value.split("=")[1];
          });
          return obj;
        },
        errorNotice(error) {
          let noticeConfig = {
            type: "warning",
            title: "提醒",
            desc: error,
          };
          switch (error) {
            case "invalidUserOrPassword":
              noticeConfig.desc = "您輸入的帳號或密碼有誤，請重新輸入";
              break;
            case "userNotRegister":
              noticeConfig.desc = "未註冊微樂帳號";
              break;
            case "userNotFound":
              // noticeConfig.desc = "找不到此帳號"; 因為富邦登入如果帳號正確但密碼錯誤，也是顯示這句，先改顯示為“您輸入的帳號或密碼有誤，請重新輸入”
              noticeConfig.desc = "您輸入的帳號或密碼有誤，請重新輸入";
              break;
            case "email_userNotFound":
              noticeConfig.desc = "找不到此帳號";
              break;
            case "userAccountExists":
              noticeConfig.desc = "註冊失敗:該電子信箱已存在";
              break;
            case "userNameExists":
              noticeConfig.desc = "名字已存在";
              break;
            case "userEmailExists":
              noticeConfig.desc = "電子信箱已存在";
              break;
            case "badUserName":
              noticeConfig.desc = "名字錯誤";
              break;
            case "badPassword":
              noticeConfig.desc = "密碼格式無效";
              break;
            case "samePassword":
              noticeConfig.desc = "新密碼與舊密碼相同";
              break;
            case "passwordDifference":
              noticeConfig.desc = "兩次輸入密碼不一致";
              break;
            case "passwordNotMatch":
              noticeConfig.desc = "舊密碼錯誤";
              break;
            case "badEmail":
              noticeConfig.desc = "電子信箱錯誤";
              break;
            case "badPhone":
              noticeConfig.desc = "電話號碼錯誤";
              break;
            case "fubonNotFound":
              noticeConfig.desc = "解除綁定失敗";
              break;
            case "twmNotFound":
              noticeConfig.desc = "解除綁定失敗";
              break;
            case "eventNotFound":
              noticeConfig.desc = "活動不存在";
              break;
            case "eventExpired":
              noticeConfig.desc = "活動已過期";
              break;
            case "eventRegisterExists":
              noticeConfig.desc = "活動已報名過";
              break;
            case "eventSkillGroupIdNotFound":
              noticeConfig.desc = "活動選項不存在";
              break;
            case "registerNotFound":
              noticeConfig.desc = "沒有報名任何活動";
              break;
            case "eventSkillGroupFulled":
              noticeConfig.desc = "活動選項組別已額滿";
              break;
            case "volunteerFulled":
              noticeConfig.desc = "活動已額滿";
              break;
            case "eventSkillGroupListFormatError":
              noticeConfig.desc = "捐贈項目數量不可為0";
              break;
            case "eventRegisterNotFound":
              noticeConfig.desc = "您無報名該活動";
              break;
            case "userNpoExists":
              noticeConfig.desc = "您已經是NPO了";
              break;
            case "npoEnterpriseNameExists":
              noticeConfig.desc = "您已經是企業了";
              break;
            case "npoNameExists":
              noticeConfig.desc =
                "已有同名的 NPO，請聯絡單位負責人確認是否重複申請";
              break;
            case "ipBlock":
              noticeConfig.desc = "server IP block";
              break;
            case "twm_userNotFound":
              noticeConfig.desc = "您輸入的資訊有誤，請重新輸入";
              break;
            case "fubonAlreadyBindUser":
              noticeConfig.desc = "此富邦愛心志工社會員電子信箱已綁定其他帳號";
              break;
            case "fubonAlreadyBind":
              noticeConfig.desc = "您的帳號已綁定此富邦愛心志工社會員電子信箱";
              break;
            case "twmAlreadyBindUser":
              noticeConfig.desc = "此台灣大哥大員工資料已綁定其他帳號";
              break;
            case "twmAlreadyBind":
              noticeConfig.desc = "您的帳號已綁定此台灣大哥大員工資料";
              break;
            case "userLicenseImageNotFound":
              noticeConfig.desc = "User license image does not exist";
              break;
            case "imageTypeInValid":
              noticeConfig.desc = "Image type invalid";
              break;
            default:
              noticeConfig.desc = error;
          }
          this.$Notice[noticeConfig.type]({
            title: noticeConfig.title,
            desc: noticeConfig.desc,
          });
        },
      },
    });
    // --------Global mixin end--------
  },
};
import Vue from "vue";

Vue.use(LogPlugin);
