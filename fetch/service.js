import AjaxSend from "./http";

/**
 * @Template 服务模板示例
 * interface:{  定义請求的名稱，請保持唯一
 *  method: string, 請求方式（get、delete、head、post、put、patch）
 *  requestUrl: string, 請求的服务地址（在接口地址中'不'包含参数下使用，例如：'api/v2/user/'）
 *  requestCommon: function, 請求的服务地址（在接口地址中包含参数下使用，例如：'api/v2/users/' + params + '/active'）
 *  requestPost: function  返回对象类型，可以自己定义。（主要用于post請求也需要在url上面传参的方式；例如：'api/v2/user?id=param'，同时也有在body传参）
 * }
 */
let PublicObjService = {
  // =============Login、 Logout start=============
  // 用户登录
  authToken: {
    method: "post",
    requestUrl: "api/v1/auth/token",
  },
  newAuthToken: {
    method: "put",
    requestUrl: "api/v1/auth/token",
  },
  loginFubon: {
    method: "post",
    requestUrl: "api/v1/auth/fubon",
  },
  loginTWM: {
    method: "post",
    requestUrl: "api/v1/auth/twm",
  },
  // 登出
  logoutAuth: {
    method: "delete",
    requestUrl: "api/v1/user/token",
  },

  // =============Login、 Logout end=============

  // ============= 註冊/密碼/綁定台 相關 start=============
  // 註冊
  registAccount: {
    method: "post",
    requestUrl: "api/v1/users",
  },
  // 忘記密碼
  forgetPassword: {
    method: "post",
    requestUrl: "api/v1/reset/password",
  },
  //密碼重設
  resetPassword: {
    method: "put",
    requestUrl: "api/v1/reset/password",
  },
  // 綁定富邦
  bindFubon: {
    method: "post",
    requestUrl: "api/v1/user/fubon",
  },
  // 綁定台哥大
  bindTWM: {
    method: "post",
    requestUrl: "api/v1/user/twm",
  },
  // 解除綁定
  unbindFubon: {
    method: "delete",
    requestUrl: "api/v1/user/fubon",
  },
  // 解除綁定
  unbindTWM: {
    method: "delete",
    requestUrl: "api/v1/user/twm",
  },
  // ============= 註冊/密碼/綁定台 相關 end=============

  // =============活動(報名 / 關注 / 瀏覽)相關 start=============
  // 活動瀏覽
  postEventVisit: {
    method: "post",
    requestUrl: "api/v1/events/visit",
  },
  // 活動報名
  postEventRegister: {
    method: "post",
    requestUrl: "api/v1/events/register",
  },
  // 活動關注
  postEventFocus: {
    method: "post",
    requestUrl: "api/v1/events/focus",
  },
  // 活動單位關注
  postNpoSubscribe: {
    method: "post",
    requestUrl: "api/v1/npos/subscribe",
  },
  // 取消報名 / 捐贈
  deleteEventRegister: {
    method: "delete",
    requestCommon: function(id) {
      this.requestUrl = "api/v1/events/" + id + "/unregister";
    },
  },
  // 取消活動關注
  deleteEventFocus: {
    method: "delete",
    requestCommon: function(id) {
      this.requestUrl = "api/v1/events/" + id + "/unfocus";
    },
  },
  // 取消活動單位關注
  deleteNpoSubscribe: {
    method: "delete",
    requestCommon: function(id) {
      this.requestUrl = "api/v1/npos/" + id + "/unsubscribe";
    },
  },
  // =============活動(報名 / 關注 / 瀏覽)相關 end=============

  // =============個人資訊 start=============
  // 個人護照
  getProfile: {
    method: "get",
    requestUrl: "api/v1/user/profile",
  },
  // 個人資料修改
  editProfile: {
    method: "patch",
    requestUrl: "api/v1/users",
  },
  putProfileLogo: {
    method: "put",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/users/" + id + "/file/" + type;
    },
  },
  deleteProfileLogo: {
    method: "delete",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/users/" + id + "/file/" + type;
    },
  },
  // 我參加過的活動
  getRegisteredEvent: {
    method: "get",
    requestUrl: "api/v1/user/registeredEvent",
  },
  // 我所關注的活動
  getFocusEvent: {
    method: "get",
    requestUrl: "api/v1/user/focusedEvent",
  },
  // 我捐過的物資
  getSuppliedEvent: {
    method: "get",
    requestUrl: "api/v1/user/suppliedEvent",
  },
  // 我所關注的物資缺
  getSuppliedFocus: {
    method: "get",
    requestUrl: "api/v1/user/suppliedFocus",
  },
  // 關注的公益品牌
  getSubscribedNpo: {
    method: "get",
    requestUrl: "api/v1/user/subscribedNpo",
  },
  // 評分活動
  getRatingEvent: {
    method: "get",
    requestUrl: "api/v1/user/ratingEvent",
  },
  // 瀏覽過的活動
  getVisitEvent: {
    method: "get",
    requestUrl: "api/v1/user/visitEvent",
  },
  // 進階搜尋志工時數
  getVolunteerTime: {
    method: "get",
    requestUrl: "api/v1/user/volunteerTime",
  },
  // 專業證照
  getLicenseImage: {
    method: "get",
    requestUrl: "api/v1/user/licenseImage",
  },
  // =============個人資訊 end=============

  // =============main page start=============
  getBanner: {
    method: "get",
    requestUrl: "api/v1/banners",
  },
  getNpoPromote: {
    method: "get",
    requestUrl: "api/v1/npos/promote",
  },
  getVolunteerEvent: {
    method: "get",
    requestUrl: "api/v1/events/volunteer",
  },
  getEnterpriseEvent: {
    method: "get",
    requestUrl: "api/v1/events/enterprise",
  },
  getSupplyEvent: {
    method: "get",
    requestUrl: "api/v1/events/supply",
  },
  // =============main page end=============
  // 成為夥伴
  postNpos: {
    method: "post",
    requestUrl: "api/v1/npos",
  },
  // 取得User List
  getUsers: {
    method: "get",
    requestUrl: "api/v1/users",
  },
  // 取得User Menu List
  getUsersMenu: {
    method: "get",
    requestUrl: "api/v1/users/menu",
  },
  // 取得Event List
  getEvents: {
    method: "get",
    requestUrl: "api/v1/events",
  },
  // 取得DonateNPO List
  getDonationNpos: {
    method: "get",
    requestUrl: "api/v1/donationNpos",
  },
  // 取得NPO List
  getNpos: {
    method: "get",
    requestUrl: "api/v1/npos",
  },
  // 取得活動報名列表
  getEventRegistered: {
    method: "get",
    requestUrl: "api/v1/events/registered",
  },
  // 修改當前用戶個人密碼
  patchCurrentUserPassword: {
    method: "patch",
    requestUrl: "api/v1/user/password",
  },
  postBanner: {
    method: "post",
    requestUrl: "api/v1/banners",
  },
  patchBanner: {
    method: "patch",
    requestUrl: "api/v1/banners",
  },
  putBanner: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/banners/" + id + "/file/" + type;
    },
  },
  deleteBanner: {
    method: "delete",
    requestUrl: "api/v1/banners/{1}/active",
  },
  deleteBannerFile: {
    method: "delete",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/banners/" + id + "/file/" + type;
    },
  },
  putEventFile: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/events/" + id + "/file/" + type;
    },
  },
  // deleteBanner: {
  //   method: "delete",
  //   requestUrl: "api/v1/banners/{1}/active",
  // },
  deleteEventFile: {
    method: "delete",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/events/" + id + "/file/" + type;
    },
  },
  //Check token of current login user
  tokenCheck: {
    method: "get",
    requestUrl: "api/v1/user/tokenCheck",
  },
  // 修改NPO
  patchNpos: {
    method: "patch",
    requestUrl: "api/v1/npos",
  },
  // Upload file and attached to npo
  putNposFile: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/npos/" + id + "/file/" + type;
    },
  },
  // Add DonateNPO
  postDonationNpos: {
    method: "post",
    requestUrl: "api/v1/donationNpos",
  },
  // Patch DonateNPO
  patchDonationNpos: {
    method: "patch",
    requestUrl: "api/v1/donationNpos",
  },
  // Upload file and attached to DonateNPO
  putDonateNPOFile: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/donationNpos/" + id + "/file/" + type;
    },
  },
  // Patch Events
  patchEvents: {
    method: "patch",
    requestUrl: "api/v1/events",
  },
  // Upload file and attached to DonateNPO
  putEventsFile: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/events/" + id + "/file/" + type;
    },
  },
  deleteDonationNpos: {
    method: "delete",
    requestUrl: "api/v1/donationNpos/{1}/active",
  },
  deleteDonationNposFile: {
    method: "delete",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/donationNpos/" + id + "/file/" + type;
    },
  },
  postEvents: {
    method: "post",
    requestUrl: "api/v1/events",
  },
  postSkillGroup: {
    method: "post",
    requestUrl: "api/v1/events/skillGroup",
  },
  patchSkillGroup: {
    method: "patch",
    requestUrl: "api/v1/events/skillGroup",
  },
  deleteSkillGroup: {
    method: "delete",
    requestUrl: "api/v1/events/{1}/skillGroup",
    // requestCommon: function(id) {
    //   this.requestUrl = "api/v1/events/" + id + "/skillGroup";
    // },
  },
  // 取得NPO List Menu
  getNposMenu: {
    method: "get",
    requestUrl: "api/v1/npos/menu",
  },
  postEventsJoin: {
    method: "post",
    requestUrl: "api/v1/events/join",
  },
  postEventsLeave: {
    method: "post",
    requestUrl: "api/v1/events/leave",
  },
  putEventsResultFile: {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/events/" + id + "/resultFile/" + type;
    },
  },
  deleteEventResultFile: {
    method: "delete",
    requestCommon: function(id, type) {
      this.requestUrl = "api/v1/events/" + id + "/resultFile/" + type;
    },
  },
  getEventsTags: {
    method: "get",
    requestUrl: "api/v1/events/tags",
  },
  patchEventsRegistered: {
    method: "patch",
    requestUrl: "api/v1/events/registered",
  },
  getAppConfigs: {
    method: "get",
    requestUrl: "api/v1/appConfigs",
  },  
  patchAppConfigs: {
    method: "patch",
    requestUrl: "api/v1/appConfigs",
  },  
  getStatisticsStatus: {
    method: "get",
    requestUrl: "api/v1/statistics/status",
  },  
  getDumpRanking: {
    method: "get",
    requestUrl: "api/v1/report/dumpRanking",
  },    
  getDumpFubonEvent: {
    method: "get",
    requestUrl: "api/v1/report/dumpFubonEvent",
  },     
  getEventsMenu: {
    method: "get",
    requestUrl: "api/v1/events/menu",
  },  
  getTWMEnterprise: {
    method: "get",
    requestUrl: "api/v1/twmEnterprise",
  },   
  postTWMEnterprise: {
    method: "post",
    requestUrl: "api/v1/twmEnterprise",
  },   
  getDumpTwmEvent: {
    method: "get",
    requestUrl: "api/v1/report/dumpTwmEvent",
  },    
  getPushMessage: {
    method: "get",
    requestUrl: "api/v1/notifications/pushMessage",
  },   
  postPushMessage: {
    method: "post",
    requestUrl: "api/v1/notifications/pushMessage",
  },  
  getNotificationsMenu: {
    method: "get",
    requestUrl: "api/v1/notifications/menu",
  },     
};

AjaxSend.loopServiceApi(PublicObjService);
export default PublicObjService;
