<template>
  <div class="headerWrapper">
    <div class="headerContainer">
      <div class="nav">
        <img
          class="menuBtn hamburgerBtn"
          src="@/assets/images/header/nav/M/topbar_drawer.svg"
          :class="{ active: menuShow }"
          @click="menuBtnTypeHandler('click')"
        />
        <div class="logo">
          <router-link to="/"> </router-link>
        </div>
        <div class="rightContainer">
          <img
            class="menuBtn searchIcon"
            src="@/assets/images/header/ic_search_w.svg"
            alt=""
            @click="searchBtnHandler('click')"
          />
          <div class="photoContainer">
            <img
              v-if="!loginStatus"
              class="menuBtn member"
              src="@/assets/images/header/nav/M/account_mobile.svg"
              alt=""
              @click="login()"
            />
            <button class="login" v-if="!loginStatus" @click.prevent="login()">
              登入
            </button>
            <!-- 大頭照 -->
            <img
              v-else
              class="menuBtn proLogo"
              @error="
                (e) => {
                  e.target.src = require('@/assets/images/other/default_userprofile_image.png');
                }
              "
              :src="profileIcon"
              alt=""
              @click.stop="profileHandler('logoClick')"
            />
            <div v-if="loginPoptipShow" class="poptip">
              <router-link
                @click.native="profileHandler"
                v-show="loginStatus"
                to="/me"
              >
                個人資料
              </router-link>
              <div @click.prevent="logout()">
                登出
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="navContentSection" :class="{ active: menuShow }">
        <img
          class="menuBtn close"
          src="@/assets/images/header/nav/M/topbar_close.svg"
          @click="menuBtnTypeHandler"
        />
        <ul @click="menuBtnTypeHandler">
          <li v-for="(item, index) of navData" :key="index">
            <router-link :to="'/' + item.link">
              <div
                class="navIcon"
                :class="
                  `${item.link} ${
                    $route.path !== '/' + item.link ? '' : 'active'
                  }`
                "
              ></div>
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <transition name="fade" mode="out-in">
        <div
          @click.self="layoutClose('click')"
          v-show="layoutShow"
          class="over_lay"
        ></div>
      </transition>
    </div>
    <div class="searchContentSection" :class="{ active: searchShow }">
      <input
        ref="inputSearch"
        type="text"
        placeholder="輸入關鍵字或活動名稱"
        @compositionstart="cstartHandler"
        @compositionend="cendHandler"
        @keyup.enter="inputHandler"
        v-model="searchContext"
      />
      <img
        class="menuBtn searchIcon"
        src="@/assets/images/header/ic_search_g.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["route"],
  data() {
    return {
      menuShow: false,
      layoutShow: false,
      searchShow: false,
      loginStatus: false,
      loginPoptipShow: false,
      recordClickOrign: "",
      searchContext: "",
      compositionStatus: false,
      profileIcon: "",
      visibilitychange: false,
    };
  },
  computed: {
    navData() {
      return [
        {
          title: "志工",
          link: "new",
        },
        {
          title: "企業志工",
          link: "enterprise",
        },
        {
          title: "物資",
          link: "supply",
        },
        {
          title: "捐款",
          link: "donate",
        },
        {
          title: "活動單位",
          link: "npo",
        },
      ];
    },
    getAccessToken() {
      return this.$store.state.login.accessToken;
    },
    ...mapGetters(["accessToken", "profileGetter", "searchStrGetter"]),
  },
  watch: {
    getAccessToken: {
      immediate: false,
      handler() {
        this.loginStatus = this.getAccessToken ? true : false;
      },
    },
    loginStatus() {
      this.loginPoptipShow = false;
    },
    profileGetter: {
      immediate: true,
      handler() {
        if (this.profileGetter) {
          this.profileIcon = this.profileGetter.icon;
        } else {
          if (process.client && localStorage.getItem("accessToken")) {
            this._API.getProfile.send().then((profile) => {
              this.$store.dispatch("setProfile", profile);
            });
          }
        }
      },
    },
    $route() {
      this.searchContext = null;
      this.$store.dispatch("delSearchStr");
    },
  },
  created() {
    if (process.client) {
      document.addEventListener("visibilitychange", this.pageTabChangeHandler);

      if (localStorage.getItem("accessToken") && !this.accessToken) {
        this.$store.dispatch("setToken", {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
          loginType: localStorage.getItem("loginType"),
        });
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
    this.loginStatus = localStorage.getItem("accessToken") ? true : false;
    document.querySelector("body").addEventListener("click", () => {
      this.loginPoptipShow = false;
    });
  },
  beforeDestroy() {
    window.removeEventListener("visibilitychange", this.pageTabChangeHandler);
  },

  methods: {
    resizeHandler() {
      if (
        (this.recordClickOrign !== "click") |
        (window.innerWidth >= this.breakPointLarge)
      )
        this.layoutClose();
    },
    login() {
      this.$router.push({ name: "login" });
    },
    logout() {
      this._API.logoutAuth.send().then((res) => {
        this.$store.dispatch("delToken").then(() => {
          this.$router.replace({ name: "home" }).catch(() => {});
          this.loginStatus = false;
        });
      });
    },
    profileHandler(flag) {
      if (flag) {
        this.loginPoptipShow = this.loginStatus ? !this.loginPoptipShow : false;
      } else {
        this.loginPoptipShow = false;
      }
      this.loginStatus
        ? false
        : this.$router.replace({ name: "home" }).catch(() => {});
    },
    menuBtnTypeHandler(val) {
      if (window.innerWidth < this.breakPointLarge) {
        this.layoutShow = this.menuShow = !this.menuShow;
        this.loginPoptipShow = false;
      }
      this.recordClickOrign = val;
    },
    searchBtnHandler(val) {
      this.searchShow = true;
      this.layoutShow = true;
      this.recordClickOrign = val;
      this.$nextTick(() => {
        this.$refs.inputSearch.focus();
      });
    },
    layoutClose() {
      this.menuShow = false;
      this.layoutShow = false;
      this.loginPoptipShow = false;
      this.searchShow = window.innerWidth < this.breakPointLarge ? false : true;
      this.recordClickOrign = "";
    },
    inputHandler(event) {
      if (this.compositionStatus) return false;
      this.$store.dispatch("setSearchStr", this.searchContext);
      if (!this.searchContext) {
        this.$store.dispatch("delSearchStr");
      }
      this.layoutClose();
    },
    cstartHandler() {
      this.compositionStatus = true;
    },
    cendHandler() {
      this.compositionStatus = false;
    },
    pageTabChangeHandler() {
      let accessToken = localStorage.getItem("accessToken"),
        refreshToken = localStorage.getItem("refreshToken"),
        loginType = localStorage.getItem("loginType");
      // setToken
      let process = (callback) => {
        this.$store.dispatch("delToken");
        this.$store
          .dispatch("setToken", {
            accessToken: accessToken,
            refreshToken: refreshToken,
            loginType: loginType,
          })
          .then(() => {
            this._API.getProfile.send().then((profile) => {
              this.$store.dispatch("setProfile", profile);
              callback();
            });
          });
      };
      // 各種情境導頁處理
      let checkToken = () => {
        if (accessToken) {
          if (accessToken !== this.$store.state.login.accessToken) {
            process(() => {});
          }
          if (this.$route.path.search(/login|user/) > 0) {
            this.$router.replace({ name: "home" }).catch(() => {});
          }
        } else {
          this.loginStatus = false;
          this.$store.dispatch("delToken");
        }
      };
      if (document.visibilityState === "visible") {
        checkToken();
        this.$store.dispatch("setWebVisibility", true);
      } else {
        this.$store.dispatch("setWebVisibility", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/header/common.scss";
@import "@/assets/scss/common/_common.scss";
</style>
