<template>
  <section>
    <Carousel
      :autoplay="imgData.length > 1 ? true : false"
      v-model="currentNum"
      loop
      :autoplay-speed="5000"
      :height="height"
      v-if="breakPoint >= breakPointLarge || $route.name == 'event'"
      :class="articleBanner ? '' : 'bannerContainer'"
    >
      <CarouselItem
        v-for="(item, index) of imgData"
        :key="`${item.id}_${index}`"
      >
        <a :href="item.url" target="_self">
          <div
            class="demo-carousel"
            :class="articleBanner ? 'articleBanner' : 'banner'"
          >
            <img
              :src="item.image"
              :alt="item.id"
              @error="
                (e) => {
                  _imageLoadError(item.image);
                }
              "
              @load="$emit('imageLoadSuccess')"
            />
          </div>
        </a>
      </CarouselItem>
    </Carousel>
    <!-- 志工、企業志工、物資,手機版banner -->
    <Carousel
      :autoplay="imgData.length > 1 ? true : false"
      v-model="currentNum"
      loop
      :autoplay-speed="5000"
      :height="height"
      v-if="breakPoint < breakPointLarge && $route.name !== 'event'"
    >
      <CarouselItem
        v-for="(item, index) of imgData"
        :key="`M_${item.id}_${index}`"
      >
        <a :href="item.url" target="_self">
          <div class="demo-carousel banner">
            <img
              :src="item.smallImage"
              :alt="item.id"
              @error="
                (e) => {
                  _imageLoadError(item.smallImage);
                }
              "
              @load="$emit('imageLoadSuccess')"
            />
          </div>
        </a>
      </CarouselItem>
    </Carousel>
  </section>
</template>
<script>
export default {
  props: {
    articleBanner: "",
    widthType: {
      default: () => {
        return null;
      },
    },
    imgData: {
      type: [Object, Array],
      default: function() {
        return [
          {
            image:
              "https://www.isharing.tw/uploads/banner/7fc48ca0ae8e4e178ac06e1dd99837ad.png",
            id: "banner1",
            url: "https://corp.taiwanmobile.com/esg/greenInitiatives.html",
          },
        ];
      },
    },
  },
  data() {
    return {
      currentNum: 0,
      height: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.debounce(this.resizeHandler));
    this.resizeHandler();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.bannerContainer::v-deep {
  .ivu-carousel-arrow {
    &.left {
      left: 70px;
    }
    &.right {
      right: 70px;
    }
  }
}
.banner {
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
}
.articleBanner {
  display: flex;
  justify-content: center;
  img {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
}
.ivu-carousel-dots {
  z-index: 0;
}
</style>
