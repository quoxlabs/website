import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "quox",
  description: "Bring the web stack to the desktop",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Vision", link: "/vision" },
      { text: "Plan", link: "/plan" },
    ],

    sidebar: [
      {
        text: "Vision",
        link: "/vision",
      },
      {
        text: "Plan",
        link: "/plan",
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/quoxlabs/quox" },
    ],
    editLink: {
      text: "Improve this page",
      pattern: "https://github.com/quoxlabs/website/edit/main/:path",
    },
  },
});
