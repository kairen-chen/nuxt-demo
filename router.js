import Vue from "vue";
import VueRouter from "vue-router";

import VolunteerPage from "@/pages/VolunteerPage.vue";
import EnterpriseVolunteerPage from "@/pages/EnterpriseVolunteerPage.vue";
import SuppliesPage from "@/pages/SuppliesPage.vue";
import DonatePage from "@/pages/DonatePage.vue";
import ActivityUnitPage from "@/pages/ActivityUnitPage.vue";
import MemberPage from "@/pages/MemberPage.vue";
import ErrorPage from "@/pages/ErrorPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

import About from "@/pages/footer/About.vue";
import Join from "@/pages/footer/Join.vue";
import JoinSuccess from "@/components/layoutUnit/JoinSuccess.vue";
import Faq from "@/pages/footer/Faq.vue";
import Download from "@/pages/footer/Download.vue";
import Privacy from "@/pages/footer/Privacy.vue";
import Tos from "@/pages/footer/Tos.vue";

import ActivityUnitFile from "@/pages/file/ActivityUnitFile.vue";
import ArticleFile from "@/pages/file/ArticleFile.vue";
import EditMemberFile from "@/components/pages/file/EditMemberFile.vue";
import LoginFubon from "@/components/pages/member/LoginFubon.vue";
import BindFubon from "@/components/pages/member/BindFubon.vue";
import BindTWM from "@/components/pages/member/BindTWM.vue";
import RegistMember from "@/components/pages/member/RegistMember.vue";
import ForgetPassword from "@/components/pages/member/ForgetPassword.vue";
import ResetPassword from "@/components/pages/member/ResetPassword.vue";
import TwmCallback from "@/components/pages/member/TwmCallback.vue";
import SignInEvent from "@/components/layoutUnit/signInEventModal/SignInEvent.vue";

import BackendLogin from "@/components/admin/pages/Login.vue";
import BackendAdmin from "@/components/admin/pages/BackendAdmin.vue";
import NpoList from "@/components/admin/pages/npo/list.vue";
import NpoEdit from "@/components/admin/pages/npo/edit.vue";
import EventList from "@/components/admin/pages/event/list.vue";
import EventVolunteerAdd from "@/components/admin/pages/event/addVolunteer.vue";
import EventEnterpriseAdd from "@/components/admin/pages/event/addEnterprise.vue";
import EventSupplyAdd from "@/components/admin/pages/event/addSupply.vue";
import EventVolunteerEdit from "@/components/admin/pages/event/editVolunteer.vue";
import EventEnterpriseEdit from "@/components/admin/pages/event/editEnterprise.vue";
import EventSupplyEdit from "@/components/admin/pages/event/editSupply.vue";
import MemberList from "@/components/admin/pages/member/list.vue";
import MemberEdit from "@/components/admin/pages/member/edit.vue";
import NpoInviteList from "@/components/admin/pages/npoInvite/list.vue";
import NpoInviteEdit from "@/components/admin/pages/npoInvite/edit.vue";
import BannerList from "@/components/admin/pages/banner/list.vue";
import BannerAdd from "@/components/admin/pages/banner/add.vue";
import BannerEdit from "@/components/admin/pages/banner/edit.vue";
import DonateNPOList from "@/components/admin/pages/donateNPO/list.vue";
import DonateNPOAdd from "@/components/admin/pages/donateNPO/add.vue";
import DonateNPOEdit from "@/components/admin/pages/donateNPO/edit.vue";
import EventRegisterList from "@/components/admin/pages/event/registerList.vue";
import EventQrcode from "@/components/admin/pages/event/qrcode.vue";
import EventQrcodeLeave from "@/components/admin/pages/event/qrcodeLeave.vue";
import EventResultPhoto from "@/components/admin/pages/event/editResultPhoto.vue";
import EventMatchMember from "@/components/admin/pages/event/matchMemberList.vue";
import EventStatusList from "@/components/admin/pages/status/list.vue";
import EventExportList from "@/components/admin/pages/export/list.vue";
import PushNotificationList from "@/components/admin/pages/pushNotification/list.vue";
import PushNotificationAdd from "@/components/admin/pages/pushNotification/add.vue";
import MemberTwm from "@/components/admin/pages/member/twm.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export function createRouter(context) {
  return new VueRouter({
    mode: "history", //可讓#字號消失
    base: "/",
    scrollBehavior(to, from, savedPosition) {
      if (
        (to.name === "event" && from.name === "signInEvent") ||
        (to.name === "signInEvent" && from.name === "event")
      ) {
        return savedPosition; // 保持原來捲軸位置
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: [
      {
        path: "/",
        redirect: "/new",
      },
      {
        name: "home",
        path: "/new",
        component: VolunteerPage,
      },
      {
        name: "enterprise",
        path: "/enterprise",
        component: EnterpriseVolunteerPage,
      },
      {
        name: "supply",
        path: "/supply",
        component: SuppliesPage,
      },
      {
        name: "donate",
        path: "/donate",
        component: DonatePage,
      },
      {
        name: "npo",
        path: "/npo",
        component: ActivityUnitPage,
      },
      {
        name: "event",
        path: "/event/:id",
        component: ArticleFile,
        children: [
          {
            name: "signInEvent",
            path: "/event/:id/register",
            component: SignInEvent,
            meta: {
              requiresFrontStationAuth: true, //需要登入才能訪問
            },
          },
        ],
      },
      {
        name: "eventUnit",
        path: "/npo/:id",
        component: ActivityUnitFile,
      },
      {
        name: "me",
        path: "/me",
        component: MemberPage,
        meta: {
          requiresFrontStationAuth: true, //需要登入才能訪問
        },
      },
      {
        name: "meEdit",
        path: "/me/profile",
        component: EditMemberFile,
        meta: {
          requiresFrontStationAuth: true,
        },
      },
      {
        name: "login",
        path: "/login",
        component: LoginPage,
      },
      {
        name: "loginFubon",
        path: "/login/loginFubon",
        component: LoginFubon,
      },
      {
        path: "/oauth/twmcallback",
        component: TwmCallback,
      },

      // ----會員中心頁內點擊綁定用----
      {
        name: "bindFubon",
        path: "/bind/bindFubon",
        component: BindFubon,
      },
      {
        name: "bindTWM",
        path: "/bind/bindTWM",
        component: BindTWM,
      },
      // ----會員中心頁內點擊綁定用----

      {
        name: "regist",
        path: "/user/regist",
        component: RegistMember,
      },
      {
        name: "forgetPassword",
        path: "/user/forgetPassword",
        component: ForgetPassword,
      },
      {
        name: "resetPassword",
        path: "/user/resetPassword",
        component: ResetPassword,
      },
      // -------footer start-------
      {
        name: "footerAbout",
        path: "/about",
        component: About,
      },
      {
        name: "footerJoin",
        path: "/join",
        component: Join,
        meta: {
          requiresFrontStationAuth: true, //需要登入才能訪問
        },
      },
      {
        name: "footerJoinSuccess",
        path: "/join/success",
        component: JoinSuccess,
        meta: {
          requiresFrontStationAuth: true, //需要登入才能訪問
        },
      },
      {
        name: "footerFaq",
        path: "/faq",
        component: Faq,
      },
      {
        name: "footerDownload",
        path: "/download",
        component: Download,
      },
      {
        name: "footerPrivacy",
        path: "/privacy",
        component: Privacy,
      },
      {
        name: "footerTos",
        path: "/tos",
        component: Tos,
      },
      // -------footer end-------
      {
        path: "*",
        redirect: "/404",
      },
      // 當網址亂打會被導到這,網址停留在/404
      {
        path: "/404",
        component: ErrorPage,
      },

      // Backend Admin Login
      {
        path: "/backend",
        redirect: "/backend/Login",
      },
      {
        name: "backendLogin",
        path: "/backend/Login",
        component: BackendLogin,
      },
      // Backend Admin
      {
        name: "backendNpoList",
        path: "/backend/Npo/list",
        component: NpoList,
      },
      {
        name: "backendNpoEdit",
        path: "/backend/Npo/edit/:id",
        component: NpoEdit,
      },
      // {
      //   // name: "backendEventList",
      //   path: "/backend/event/list",
      //   component: EventList,
      // },
      {
        name: "backendNPOEventList",
        path: "/backend/NPOEvent/list",
        component: EventList,
      },
      {
        name: "backendAdminEventList",
        path: "/backend/Event/list/:npouid",
        component: EventList,
      },
      {
        name: "backendEventVolunteerAdd",
        path: "/backend/Event/addVolunteer",
        component: EventVolunteerAdd,
      },
      {
        name: "backendEventEnterpriseAdd",
        path: "/backend/Event/addEnterprise",
        component: EventEnterpriseAdd,
      },
      {
        name: "backendEventSupplyAdd",
        path: "/backend/Event/addSupply",
        component: EventSupplyAdd,
      },
      {
        name: "backendEventVolunteerEdit",
        path: "/backend/Event/editVolunteer/:id",
        component: EventVolunteerEdit,
      },
      {
        name: "backendEventEnterpriseEdit",
        path: "/backend/Event/editEnterprise/:id",
        component: EventEnterpriseEdit,
      },
      {
        name: "backendEventSupplyEdit",
        path: "/backend/Event/editSupply/:id",
        component: EventSupplyEdit,
      },
      {
        //報名列表
        name: "backendEventRegisterList",
        path: "/backend/Event/registerList/:eventId",
        component: EventRegisterList,
      },
      {
        name: "backendMemberList",
        path: "/backend/Member/list",
        component: MemberList,
      },
      {
        name: "backendMemberEdit",
        path: "/backend/Member/edit/:uid",
        component: MemberEdit,
      },
      {
        name: "backendNpoInviteList",
        path: "/backend/NpoInvite/list",
        component: NpoInviteList,
      },
      {
        name: "backendNpoInviteEditNoID",
        path: "/backend/NpoInvite/edit",
        component: NpoInviteEdit,
      },
      {
        name: "backendNpoInviteEdit",
        path: "/backend/NpoInvite/edit/:id",
        component: NpoInviteEdit,
      },
      {
        name: "backendBannerList",
        path: "/backend/Banner/list",
        component: BannerList,
      },
      {
        name: "backendBannerAdd",
        path: "/backend/Banner/add",
        component: BannerAdd,
      },
      {
        name: "backendBannerEdit",
        path: "/backend/Banner/edit/:id",
        component: BannerEdit,
      },
      {
        name: "backendDonateNPOList",
        path: "/backend/DonateNPO/list",
        component: DonateNPOList,
      },
      {
        name: "backendDonateNPOAdd",
        path: "/backend/DonateNPO/add",
        component: DonateNPOAdd,
      },
      {
        name: "backendDonateNPOEdit",
        path: "/backend/DonateNPO/edit/:id",
        component: DonateNPOEdit,
      },
      {
        name: "backendEventQrcode",
        path: "/backend/Event/qrcode/:id",
        component: EventQrcode,
      },
      {
        name: "backendEventQrcodeLeave",
        path: "/backend/Event/qrcodeLeave/:id",
        component: EventQrcodeLeave,
      },
      {
        name: "backendEventResultPhotoEdit",
        path: "/backend/Event/editResultPhoto/:eventId",
        component: EventResultPhoto,
      },
      {
        name: "backendEventMatchMemberList",
        path: "/backend/Event/matchMemberList/:eventType/:eventCity",
        component: EventMatchMember,
      },
      {
        name: "backendStatusList",
        path: "/backend/Status/list",
        component: EventStatusList,
      },
      {
        name: "backendExportList",
        path: "/backend/Export/list",
        component: EventExportList,
      },
      {
        name: "backendPushNotificationList",
        path: "/backend/pushNotification/list",
        component: PushNotificationList,
      },
      {
        name: "backendPushNotificationAdd",
        path: "/backend/pushNotification/add",
        component: PushNotificationAdd,
      },
      {
        name: "backendMemberTwm",
        path: "/backend/Member/Twm",
        component: MemberTwm,
      },
    ],
  });
}
