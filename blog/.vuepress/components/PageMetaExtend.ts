// https://github.dev/vuepress-theme-hope/vuepress-theme-hope/blob/482e9f00213e0ec97bb4bf808542e5c4b5897699/packages/theme/src/client/components/PageMeta.ts#L1-L64

import { defineComponent, h } from 'vue';
import AutoLink from "vuepress-theme-hope/lib/client/components/AutoLink";
import { EditIcon } from "vuepress-theme-hope/lib/client/components/icons";
import {
  useContributors,
  useEditLink,
  useThemeLocaleData,
  useUpdateTime,
} from "vuepress-theme-hope/lib/client/composables";

import {
  usePageFrontmatter,
} from "@vuepress/client";

import type { VNode } from "vue";
import type { HopeThemePageFrontmatter } from "vuepress-theme-hope/lib/shared";

import "vuepress-theme-hope/lib/client/styles/page-meta.scss";

export interface HopeThemePageFrontmatterExtend extends HopeThemePageFrontmatter {
    notebookLink: string
}

export default defineComponent({
  name: "PageMetaExtend",

  setup() {
    const themeLocale = useThemeLocaleData();
    const updateTime = useUpdateTime();
    const contributors = useContributors();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatterExtend>();

    let editLink = useEditLink().value;
    if (frontmatter.value.notebookLink) {
        editLink = {
            text: "查看原始 Notebook",
            link: frontmatter.value.notebookLink,
        }
    }

    return (): VNode => {
      const { metaLocales } = themeLocale.value;

      return h("footer", { class: "page-meta" }, [
        editLink
          ? h(
              "div",
              { class: "meta-item edit-link" },
              h(
                AutoLink,
                { class: "label", config: editLink },
                { before: () => h(EditIcon) }
              )
            )
          : null,
        updateTime.value
          ? h("div", { class: "meta-item update-time" }, [
              h("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
              h("span", { class: "info" }, updateTime.value),
            ])
          : null,
        contributors.value && contributors.value.length
          ? h("div", { class: "meta-item contributors" }, [
              h("span", { class: "label" }, `${metaLocales.contributors}: `),
              contributors.value.map(({ email, name }, index) => [
                h(
                  "span",
                  { class: "contributor", title: `email: ${email}` },
                  name
                ),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                index !== contributors.value!.length - 1 ? "," : "",
              ]),
            ])
          : null,
      ]);
    };
  },
});
