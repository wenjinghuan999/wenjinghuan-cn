import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  { text: "主页", link: "/", icon: "home" },
  { text: "文章列表", link: "/article/", icon: "list" },
  {
    text: "C++",
    icon: "code",
    link: "/category/C++/",
  },
  {
    text: "图形学",
    icon: "computer",
    link: "/category/图形学/",
  },
  {
    text: "数学",
    icon: "note",
    link: "/category/数学/",
  },
]);
