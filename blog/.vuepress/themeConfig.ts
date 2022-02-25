import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://wenjinghuan.cn",

  author: {
    name: "Jinghuan Wen",
    url: "https://wenjinghuan.cn",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.png",

  repo: "wenjinghuan999/wenjinghuan-cn",

  docsDir: "blog",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "<a href=\"https://beian.miit.gov.cn/\">粤ICP备20072515号</a>",

  copyright: "<a href=\"https://www.gnu.org/licenses/gpl-3.0.html\">GPL-3.0</a> Licensed | Copyright © 2021 <a href=\"https://github.com/wenjinghuan999/\">Jinghuan Wen</a>",
  
  displayFooter: true,

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  blog: {
    description: "分享一些计算机相关冷知识和技巧",
    intro: "/intro/",
    medias: {
      Zhihu: "https://zhihu.com/people/wen-sir",
      GitHub: "https://github.com/wenjinghuan999/",
      Steam: "https://steamcommunity.com/id/wensir/",
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // comment: {
    //   type: "waline",
    //   serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
    },
  },
});
