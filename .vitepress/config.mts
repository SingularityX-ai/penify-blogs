import { defineConfig, HeadConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Penify",
  titleTemplate: ":title",
  description: "Effortlessly generate precise, human like docstrings for GitHub repos with Penify.",
  transformHead: ({pageData}) => {
    const head: HeadConfig[] = [];

    head.push([
      "meta",
      { property: "og:title", content: pageData.frontmatter.title },
    ]);
    head.push([
      "meta",
      { property: "og:description", content: pageData.frontmatter.description },
    ]);
    head.push([
      "keywords",
      { property: "og:keywords", content: pageData.frontmatter.keywords },
    ]);

    return head;
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ['meta', { name: 'Penify', content: 'Automated Docstring Generation' }],
    ['meta', { name: 'keywords', content: 'Penify, docstring, automated docstring, python docstring, LLMs, Generative AI, AI documentation, AI docstring' }],
    ['meta', { property: 'og:image', content: '../public/banner.png' }],
    ['meta', { property: 'og:url', content: 'https://www.penify.dev' }],
    ['script', { type: 'text/javascript', id: 'hs-script-loader', src: '//js-na1.hs-scripts.com/44651459.js' }],
    ['script', { async: "true", src: 'https://www.googletagmanager.com/gtag/js?id=G-P8LJ4ENK1H' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-P8LJ4ENK1H');
    `]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: "/favicon.ico",
      link: "https://www.penify.dev"
    },

    nav: [
      { text: "Home", link: "https://www.penify.dev" },
      { text: "Main", link: "/" },
      { text: "Email", link: "mailto:sumansaurabh@penify.dev", rel: "noopener noreferrer" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "📄 Automated Code Documentation: A Decade in Review",
        link: "/docs/automated-source-code-documentation.md",
      },
      {
        text: "📝 Simplify Git Commits with Penify-CLI's Summary Generator",
        link: "/docs/commit-summary-with-cli.md",
      },
      {
        text: "📄 Automate Code Documentation with Penify-CLI",
        link: "/docs/code-documentation-with-cli.md",
      },
      {
        text: "📝 Semantic Commit Messages: Elevating Your Code Quality and Collaboration",
        link: "/docs/semantic-commit-messages.md",
      },
      {
        text: "🛠️ Four Common Docstring format in Python",
        link: "/docs/common-docstring-format-in-python.md",
      },
      {
        text: "🚀 Penify Genesis",
        link: "/docs/penify-genesis",
      }
    ],

    socialLinks: [
      {icon: {svg: `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512.001 512.001" xml:space="preserve">
<g>
	<g>
		<path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434
			c0,28.001,22.781,50.783,50.783,50.783h320.547c28.002,0,50.783-22.781,50.783-50.783V134.253
			C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753
			c-5.643-5.643-8.752-13.148-8.751-21.131V35.679z M446.158,461.217c0,16.479-13.406,29.885-29.884,29.885H95.726
			c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021
			c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018V461.217z"/>
	</g>
</g>
<g>
	<g>
		<path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h4.678
			c5.77,0,10.449-4.678,10.449-10.449S280.862,351.492,275.092,351.492z"/>
	</g>
</g>
<g>
	<g>
		<path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449H236.61
			c5.77,0,10.449-4.678,10.449-10.449S242.381,351.492,236.61,351.492z"/>
	</g>
</g>
<g>
	<g>
		<path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
			c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"/>
	</g>
</g>
<g>
	<g>
		<path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
			c5.77,0,10.449-4.678,10.449-10.449C387.331,260.678,382.652,256,376.882,256z"/>
	</g>
</g>
<g>
	<g>
		<path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
			c5.77,0,10.449-4.678,10.449-10.449S382.652,208.255,376.882,208.255z"/>
	</g>
</g>
</svg>`}, link: "https://docs.penify.dev/", ariaLabel: "Penify Docs"},
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
    hostname: 'https://blogs.penify.dev',
    lastmodDateOnly: false
  }
});