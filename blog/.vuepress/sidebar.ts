import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({
  "/math/two_child_problem/": [
    {
      text: "主页",
      icon: "home",
      link: "/",
    },
    {
      text: "数学",
      icon: "note",
      link: "/category/数学/",
      children: [
        {
          text: "两男孩问题",
          icon: "note",
          collapsable: false,
          prefix: "/math/two_child_problem/",
          children: [
            "two_child_problem",
            "two_child_problem_2",
            "two_child_problem_3",
          ],
        },
      ],
    },
  ],
  "/": [
    { text: "主页", link: "/" },
    { text: "C++", link: "/category/C++/", icon: "code" },
    { text: "图形学", link: "/category/图形学/", icon: "computer" },
    { text: "数学", link: "/category/数学/", icon: "note" },
  ],
});
