const webpack = require("webpack");
export default {
  env: {
    MODE: process.env.MODE,
  },
  mode: "universal",
  // mode: "spa", //spa / universal
  server: {
    port: 3333, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
  generate: {
    fallback: "index.html",
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "微樂志工",
    htmlAttrs: {
      lang: "zh-TW",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1,  user-scalable=no",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: false,
  // loadingIndicator: '~/loading.html'
  // ref -> https://nuxtjs.org/docs/configuration-glossary/configuration-loading-indicator/
  loadingIndicator: {
    name: "wandering-cubes", // cube-grid / folding-cube / rectangle-bounce / wandering-cubes
    // color: "rgba(236, 108, 1, 0.5)",
    color: "white",
    background: "white",
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["view-design/dist/styles/iview.css", "@/assets/scss/normalize.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/common/view-ui",
    "@/plugins/common/common",
    "@/plugins/common/init.client.js",
    { src: "@/plugins/common/GTM", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 客製化router
    [
      "@nuxtjs/router",
      {
        fileName: "router.js",
      },
    ],
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    // Nuxt build will not bundle files in node_modules, so if you want to bundle all dependencies into .nuxt, you should use nuxt build --standalone.
    standalone: true,
    plugins: [
      // 免import,build時自動判斷特別字,載入
      new webpack.ProvidePlugin({
        service: ["@/fetch/service", "default"],
      }),
    ],
  },
};
