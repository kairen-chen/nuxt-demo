<template>
  <div class="container">
    <app-logo msg="Lazy Load" />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
    <img
      class="orignImg fadeup"
      data-img="https://fakeimg.pl/250x100/84e1be/"
      alt=""
    />
  </div>
</template>
<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    AppLogo,
  },
  mounted() {
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && /orignImg/.test(entry.target.className)) {
          let imageUrl = entry.target.getAttribute("data-img");
          if (imageUrl) {
            entry.target.src = imageUrl;
            entry.target.removeAttribute("data-img");
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      });
    };
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    let observer = new IntersectionObserver(callback, options);
    document.querySelectorAll(".orignImg").forEach((el) => {
      observer.observe(el);
    });
  },
};
</script>
<style lang="scss" scoped>
.container {
  flex-direction: column;
  padding: 20px;
  #getID {
    color: red;
  }
  .inline {
    display: inline-flex;
  }
  .orignImg {
    display: block;
    margin-top: 600px;
    width: 400px;
    height: 200px;
  }
  .fadeup {
    transform: translateY(50px);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 1s;
    transition-timing-function: linear;
  }
  .in-view {
    transform: none;
    opacity: 1;
  }
}
</style>
