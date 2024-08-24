import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Penify",
  titleTemplate: ":title",
  description: "Effortlessly generate precise, human like docstrings for GitHub repos with Penify.",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ['meta', { name: 'Penify', content: 'Automated Docstring Generation' }],
    ['meta', { name: 'keywords', content: 'Penify, docstring, automated docstring, python docstring, LLMs, Generative AI, AI documentation, AI docstring' }],
    ['meta', { property: 'og:title', content: 'Penify' }],
    ['meta', { property: 'og:description', content: 'Effortlessly generate precise, human like docstrings for GitHub repos with Penify.' }],
    ['meta', { property: 'og:image', content: '../public/banner.png' }],
    ['meta', { property: 'og:url', content: 'https://www.penify.dev' }],
    ['script', { type: 'text/javascript', id: 'hs-script-loader', src: '//js-na1.hs-scripts.com/44651459.js' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",

    nav: [
      { text: "Home", link: "/" },
      { text: "Email", link: "mailto:sumansaurabh@penify.dev", rel: "noopener noreferrer" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "📝 Simplify Git Commits with Penify-CLI's Summary Generator",
        link: "/docs/commit-summary-with-cli.md",
      },
      {
        text: "📝 Automate Code Documentation with Penify-CLI",
        link: "/docs/code-documentation-with-cli.md",
      },
      {
        text: "📝 Four Common Docstring format in Python",
        link: "/docs/common-docstring-format-in-python.md",
      },
      {
        text: "📝 Penify Genesis",
        link: "/docs/penify-genesis",
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SingularityX-ai/", ariaLabel: "GitHub URL"},
      { icon: "linkedin", link: "https://www.linkedin.com/company/penify-dev/", ariaLabel: "LinkedIn URL" },
      { icon: "youtube", link: "https://www.youtube.com/@penify-dev", ariaLabel: "YouTube URL" },
      { icon: "twitter", link: "https://twitter.com/Snorkell_ai", ariaLabel: "Twitter URL" },
      { icon: "instagram", link: "https://www.instagram.com/penify.dev/", ariaLabel: "Twitter URL" },
      { icon: "discord", link: "https://discord.gg/wqrc8JeV", ariaLabel: "Discord URL" },
    ],

    footer: {
      copyright: "Copyright &copy; 2023 Snorkell Associates and Co",
    },
  },
  appearance: true, // Enable theme switching
  sitemap: {
    hostname: 'https://docs.penify.ai',
    lastmodDateOnly: false
  }
});