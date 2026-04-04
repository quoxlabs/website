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
        text: "Overview",
        link: "/overview",
      },
      {
        text: "Next Up",
        link: "/next",
      },
    ],

    socialLinks: [
      {
        icon: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7"> <path fill="#083344" d="M0 6h4v1h7V5h2V1H9V0H2v2H0" /> <path fill="#f7df1e" d="M4 5V1H3v3H2V3H1v2h6V4H5V1h3v1h4v2h-1V3h-1v3H9V2H6v1h2v3H5V5" /> </svg>',
        },
        link: "https://jsr.io/@quoxlabs/quox",
        ariaLabel: "JSR",
      },
      { icon: "github", link: "https://github.com/quoxlabs/quox" },
    ],
    editLink: {
      text: "Improve this page",
      pattern: "https://github.com/quoxlabs/website/edit/main/:path",
    },
  },

  markdown: {
    typographer: true,
  },
});
