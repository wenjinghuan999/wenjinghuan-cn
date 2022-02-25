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

    comment: {
      type: "waline",
      serverURL: "https://waline.wenjinghuan.cn",
      emoji: [
        "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq",
        "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili"
      ],
      requiredMeta: ['nick', 'mail'],
      copyright: false
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    pwa: {
      manifest: {
        name: "wenjinghuan.cn",
        short_name: "wenjinghuan.cn",
        description: "分享一些计算机相关冷知识和技巧",
        lang: "zh-CN",
        icons: [
          {
            src: "/assets/icon/logo512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png"
          },
          {
            src: "/assets/icon/logo192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png"
          },
          {
            src: "/assets/icon/logo512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/assets/icon/logo192.png",
            sizes: "192x192",
            type: "image/png"
          },
        ],
      },
      apple: {
        icon: "/assets/icon/logo152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/logo144.png",
        color: "#ffffff",
      },
      favicon: "/favicon.ico",
      cachePic: true,
      maxPicSize: 8192,
    },
  },
});
