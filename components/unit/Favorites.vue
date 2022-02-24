<template>
  <div class="favoritesContainer" @click.stop="favorites">
    <img :src="imgSrc" alt="start" :data-action_id="action_id" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    action_id: {
      type: [Number, String],
    },
    favoritesType: {
      type: [Number, String],
    },
    isFocus: {
      default: false,
    },
  },
  watch: {
    isFocus: {
      immediate: true,
      handler() {
        this.favoritesFlag = this.isFocus;
      },
    },
  },
  computed: {
    ...mapGetters(["profileGetter"]),
    imgSrc() {
      if (this.favoritesFlag) {
        return require("@/assets/images/other/badage_favorite_fill.svg");
      } else {
        return require("@/assets/images/other/badage_favorite.svg");
      }
    },
  },
  data() {
    return {
      favoritesFlag: false,
    };
  },
  methods: {
    favorites(e) {
      if (this.profileGetter) {
        this.favoritesFlag = !this.favoritesFlag;
        if (this.favoritesFlag) {
          // 關注
          this._API[
            this.favoritesType !== "npo" ? "postEventFocus" : "postNpoSubscribe"
          ]
            .send([{ id: this.action_id }])
            .then((res) => {
              if (!res[0].errors) {
                this.$emit("focusHandler", true);
              } else {
                this.errorNotice(res[0].errors[0].error);
              }
            });
        } else {
          let APIName =
            this.favoritesType !== "npo"
              ? "deleteEventFocus"
              : "deleteNpoSubscribe";
          // 取消關注
          this._API[APIName].requestCommon(this.action_id);
          this._API[APIName].send(this.action_id).then((res) => {
            if (!res[0].errors) {
              this.$emit("focusHandler", false);
            } else {
              this.errorNotice(res[0].errors[0].error);
            }
          });
        }
      } else {
        this.$router
          .replace({ name: "login", query: this.$route.fullPath })
          .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.favoritesContainer {
  position: relative;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    cursor: pointer;
  }
}
</style>
