import iView from "view-design";
import Config from "../common/config";
import store from "@/store";
import service from "@/fetch/service";
import { createRouter } from "../router";

let vueI18n = "",
  $router = createRouter();
export const responseDataError400 = (re) => {
  let error = "";
  switch (re) {
    case "invalidRequest":
      error = "參數無效或無法識別";
      break;
    case "invalidToken":
      error = "憑證已過期無效請重新登入";
      // return getNewToken();
      break;

    default:
      error = re;
      break;
  }
  iView.Notice.destroy();
  if (
    re === "invalidToken" ||
    re === "invalidSignature" ||
    re === "invalidAccessTask"
  ) {
    //不顯示錯誤訊息，直接將用戶登出
    // iView.Notice.warning({
    //   title: vueI18n.$t("lang.common.warning"),
    //   desc: error,
    //   duration: Config.warningDuration,
    // });
  } else {
    iView.Notice.error({
      title: "錯誤",
      desc: error,
      duration: Config.errorDuration,
    });
  }
  if (
    re === "invalidToken" ||
    re === "invalidSignature" ||
    re === "invalidAccessTask"
  ) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("moduleCodes");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("viewMonitoringListState");
    localStorage.removeItem("viewAlarmListState");

    localStorage.removeItem("id");
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    localStorage.removeItem("isNpo");
    localStorage.removeItem("isStaff");
    localStorage.removeItem("npoId");

    // iView.Notice.error({
    //   title: "API 錯誤",
    //   desc: re,
    //   duration: Config.errorDuration,
    // });

    $router
      .push({
        name:
          location.pathname.search(/backend/) === 1 ? "backendLogin" : "home",
        // location.pathname.search(/backend/) === 1 ? "backendLogin" : "login",
        // query: { redirect: `${location.pathname}${location.search}` },
      })
      .then(() => {
        location.reload();
      });
  }
};
export const responseDataError401 = (re) => {
  let error = "";
  switch (re) {
    default:
      error = "TWM code is out-of-date or invalid";
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};

export const responseDataError409 = (re) => {
  let error = "";
  switch (re) {
    case "emailValidationRequired":
      error = "用戶電子信箱必須通過認證";
      break;
    default:
      error = re;
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};
export const responseDataError422 = (re) => {
  let error = "";
  switch (re) {
    default:
      error = "稍後重試請求";
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};
export const responseDataError429 = (re) => {
  let error = "";
  switch (re) {
    case "quotaLimitation":
      error = "請求次數太頻繁";
      break;
    default:
      error = "稍後重試請求";
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};
export const responseDataError500 = (re) => {
  let error = "";
  switch (re) {
    // case "internalError":
    //   error = '系統忙碌中'
    //   break;
    default:
      error = "系統忙碌中";
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};
export const responseDataError503 = (re) => {
  let error = "";
  switch (re) {
    case "notificationUnavailable":
      error = "目前系統無法發信，請稍後再試";
      break;
    case "storageUnavailable":
      error = "系統空間不足，無法儲存檔案";
      break;
    default:
      error = re;
      break;
  }
  iView.Notice.error({
    title: "錯誤",
    desc: error,
    duration: Config.errorDuration,
  });
};
export const Error = (re, vue) => {
  if (!re) {
    vueI18n = vue;
    return;
  }
  if (re.response) {
    switch (re.response.status) {
      case 400:
        responseDataError400(re.response.data.error);
        break;
      case 401:
        responseDataError401(re.response.data.error);
        break;
      case 409:
        responseDataError409(re.response.data.error);
        break;
      case 422:
        responseDataError422(re.response.data.error);
        break;
      case 429:
        responseDataError429(re.response.data.error);
        break;
      case 500:
        responseDataError500(re.response.data.error);
        break;
      case 503:
        responseDataError503(re.response.data.error);
        break;
      default:
        iView.Notice.error({
          title: "錯誤",
          desc: "系統忙碌中",
          duration: Config.errorDuration,
        });
        break;
    }
  }
  if (!re.response) {
    iView.Notice.error({
      title: "錯誤",
      desc: "系統忙碌中",
      duration: Config.errorDuration,
    });
  }
};

export const getNewToken = () => {
  return new Promise((resolve, reject) => {
    let $store = store(),
      $router = createRouter();
    // 登入時,
    if (localStorage.getItem("accessToken")) {
      service.newAuthToken
        .send({
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          $store.dispatch("setToken", {
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          resolve("get refreshToken success !!!");
        })
        .catch((err) => {
          reject("get refreshToken fail !!!");
        });
    }
    // 未登入時
    else {
      console.log("目前無法與VUE掛載,push只會換網址,不會導頁", $router);
      $router
        .push({
          name: "login",
          query: { redirect: $router.history._startLocation },
        })
        .then(() => {
          location.reload();
        });
    }
  });
};
