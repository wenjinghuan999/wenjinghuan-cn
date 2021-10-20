const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "wenjinghuan.cn",
  description: "分享一些计算机相关冷知识和技巧",

  dest: "./dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  themeConfig: {
    logo: "/logo.png",
    hostname: "https://wenjinghuan.cn",

    author: "Jinghuan Wen",
    repo: "wenjinghuan999/wenjinghuan-cn",
    docsDir: "doc",

    nav: [
      { text: "主页", link: "/", icon: "home" },
      { text: "文章列表", link: "/article/", icon: "home" },
      {
        text: "C++",
        icon: "creative",
        link: "/cpp/",
      },
      {
        text: "图形学",
        icon: "creative",
        link: "/graphics/",
      },
      {
        text: "数学",
        icon: "creative",
        link: "/math/",
      },
    ],

    sidebar: {
      "/": [
        "",
        "cpp/",
        "graphics/",
        "math/",
      ],
    },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "always",
      links: {
        Zhihu: "https://zhihu.com/people/wen-sir",
        Github: "https://github.com/wenjinghuan999/",
        Steam: "https://steamcommunity.com/id/wensir/",
      },
    },

    footer: {
      display: true,
      content: "<a href=\"https://beian.miit.gov.cn/\">粤ICP备20072515号</a>",
      copyright: "<a href=\"https://www.gnu.org/licenses/gpl-3.0.html\">GPL-3.0</a> Licensed | Copyright © 2021 <a href=\"https://github.com/wenjinghuan999/\">Jinghuan Wen</a>"
    },

    comment: {
      type: "vssue",
      platform: "github-v4",
      owner: "wenjinghuan999",
      repo: "wenjinghuan-cn",
      clientId: "4ce23f6078e2e7112a5b",
      clientSecret: "e5f4d338f8bf4e3bb19db69008b55b59b5d3ff0f",
      admins: ["wenjinghuan999"],
    },

    copyCode: {
      duration: 0,
    },

    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
    },
  },
});
