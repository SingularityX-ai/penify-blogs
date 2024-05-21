# Penify Documentation Site

Welcome to the Penify Documentation Site, powered by VitePress. This guide will help you on how to get started with vitepress, a vue powered static site generator.

## Prerequisites

- Node.js (20.x)
- Yarn
- Basic knowledge of Vue.js and Markdown

<br>

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/SingularityX-ai/Penify-usage-doc-site

$ cd Penify-usage-doc-site
```

<br>

2. Install Yarn Packages:

```bash
$ yarn install
```

<br>

3. Run the development server:

```bash
$ yarn docs:dev
```

This will start local development server on port 3000. The site should now be running on `http://localhost:3000/`

<br>

### Create your first page

1. Create a new Markdown file in the `docs` directory.

2. Add content (html or md syntax) to this markdown file.

<br>

### Buidling for production

1. To build site for production, run:

```bash
yarn docs:build
```

The build files will be available in the `.vitepress/dist` directory.

<br>

2. To preview the production build, run:

```bash
yarn docs:preview
```

This will serve the production build locally for testing
