import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";
import { path } from "@vuepress/utils";

export default defineHopeConfig({
  base: "/",

  dest: "./dist",

  head: [
    // [
    //   "link",
    //   {
    //     rel: "stylesheet",
    //     href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
    //   },
    // ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico",
        "type": "image/x-icon"
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "wenjinghuan.cn",
      description: "分享一些计算机相关冷知识和技巧",
    },
  },

  themeConfig,

  alias: {
    "@theme-hope/components/PageMeta": path.resolve(
      __dirname,
      "./components/PageMetaExtend.vue"
    ),
  },
});
