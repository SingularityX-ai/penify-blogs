import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Snorkell.ai",
  titleTemplate: ":title",
  description: "Effortlessly generate precise, human like docstrings for GitHub repos with Snorkell.ai.",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ['meta', { name: 'Snorkell.ai', content: 'Automated Docstring Generation' }],
    ['meta', { name: 'keywords', content: 'Snorkell, docstring, automated docstring, python docstring, LLMs, Generative AI, AI documentation, AI docstring' }],
    ['meta', { property: 'og:title', content: 'Snorkell.ai' }],
    ['meta', { property: 'og:description', content: 'Effortlessly generate precise, human like docstrings for GitHub repos with Snorkell.ai.' }],
    ['meta', { property: 'og:image', content: '../public/banner.png' }],
    ['meta', { property: 'og:url', content: 'https://www.snorkell.ai' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",

    nav: [
      { text: "Home", link: "/" },
      { text: "Email", link: "mailto:sumansaurabh@snorkell.ai", rel: "noopener noreferrer" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "What is Snorkell.ai?",
        link: "/docs/what-is-snorkell-ai",
        items: [
          { text: "🛠 Install Snorkell on Github", link: "/docs/what-is-snorkell-ai#🛠%EF%B8%8F-how-to-install-snorkell-ai-on-github" },
          { text: "🛠 Install Snorkell on AzureDevops", link: "/docs/install-snorkell-on-AzureDevops" },
        ],
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SingularityX-ai/", ariaLabel: "GitHub URL"},
      { icon: "linkedin", link: "https://www.linkedin.com/company/snorkell-ai/", ariaLabel: "LinkedIn URL" },
      { icon: "youtube", link: "https://www.youtube.com/@Snorkell-ai-ck6sg", ariaLabel: "YouTube URL" },
      { icon: "twitter", link: "https://twitter.com/Snorkell_ai", ariaLabel: "Twitter URL" },
      { icon: "instagram", link: "https://www.instagram.com/snorkell.ai/", ariaLabel: "Twitter URL" },
    ],

    footer: {
      copyright: "Copyright &copy; 2023 Snorkell.ai",
    },
  },
  appearance: "force-dark",
  sitemap: {
    hostname: 'https://docs.snorkell.ai',
    lastmodDateOnly: false
  }
});
