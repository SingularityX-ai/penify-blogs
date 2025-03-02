---
title: How to Deploy a VitePress Blog with Supabase and Giscus
description: A comprehensive guide to deploying your VitePress blog on Azure Static Web Apps and Vercel, complete with Supabase database integration and Giscus comments
head:
  - - meta
    - name: keywords
      content: vitepress, azure static web apps, vercel, supabase, giscus, blog deployment, documentation site
---

# How to Deploy Your VitePress Blog with Supabase and Giscus

In this guide, we'll walk through the process of setting up and deploying a VitePress documentation site (like the Penify Blog) with Supabase for data storage and Giscus for comments. We'll cover deployment options for both Azure Static Web Apps and Vercel, giving you flexibility based on your preferences and needs.

## Table of Contents

- [How to Deploy Your VitePress Blog with Supabase and Giscus](#how-to-deploy-your-vitepress-blog-with-supabase-and-giscus)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started with the Project](#getting-started-with-the-project)
  - [Configuring Supabase](#configuring-supabase)
    - [Setting Up Your Database](#setting-up-your-database)
    - [Implementing Row Level Security](#implementing-row-level-security)
    - [Connecting Supabase to Your Application](#connecting-supabase-to-your-application)
  - [Setting Up Giscus Comments](#setting-up-giscus-comments)
    - [Creating a GitHub Discussion Repository](#creating-a-github-discussion-repository)
    - [Integrating Giscus into VitePress](#integrating-giscus-into-vitepress)
  - [Deployment Options](#deployment-options)
    - [Deploying to Azure Static Web Apps](#deploying-to-azure-static-web-apps)
      - [Step 1: Prepare Your Repository](#step-1-prepare-your-repository)
      - [Step 2: Create an Azure Static Web App](#step-2-create-an-azure-static-web-app)
      - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
      - [Step 4: Set Up a GitHub Actions Workflow](#step-4-set-up-a-github-actions-workflow)
    - [Deploying to Vercel](#deploying-to-vercel)
      - [Step 1: Set Up Vercel Account](#step-1-set-up-vercel-account)
      - [Step 2: Import Your Repository](#step-2-import-your-repository)
      - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables-1)
      - [Step 4: Configure Custom Domain (Optional)](#step-4-configure-custom-domain-optional)
  - [Environment Variables and Security](#environment-variables-and-security)
    - [For Local Development](#for-local-development)
    - [For Production](#for-production)
    - [Using Environment Variables in Your Code](#using-environment-variables-in-your-code)
  - [Troubleshooting Common Issues](#troubleshooting-common-issues)
    - [Build Failures](#build-failures)
    - [Supabase Connection Issues](#supabase-connection-issues)
    - [Giscus Not Loading](#giscus-not-loading)
    - [CORS Errors](#cors-errors)
  - [Conclusion](#conclusion)

## Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) version 20.x or higher
- [Yarn](https://yarnpkg.com/) package manager
- [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account
- Access to [Azure](https://azure.microsoft.com/) (for Azure Static Web Apps) or [Vercel](https://vercel.com/) account
- A [Supabase](https://supabase.com/) account

## Getting Started with the Project

First, let's clone the Penify Blog template to get started:

```bash
# Clone the repository
git clone https://github.com/SingularityX-ai/Penify-usage-doc-site
cd Penify-usage-doc-site

# Install dependencies
yarn install

# Run the development server
yarn docs:dev
```

This will start a local development server at `http://localhost:3000`. You can now begin customizing the content for your own needs.

## Configuring Supabase

[Supabase](https://supabase.com/) provides a powerful backend-as-a-service that we'll use for storing user data such as newsletter subscriptions. Here's how to set it up properly.

### Setting Up Your Database

1. Create an account on [Supabase](https://supabase.com/) if you don't have one already.

2. Create a new project:
   - Go to the Supabase dashboard and click "New Project"
   - Enter a name for your project
   - Set a secure database password
   - Choose the region closest to your users
   - Click "Create New Project"

3. Once your project is created, set up a table for email subscriptions:
   - Go to the "SQL Editor" in your Supabase dashboard
   - Create a new query and paste the following SQL:

```sql
-- Create a table for email subscriptions
CREATE TABLE email_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. Execute the query to create the table.

### Implementing Row Level Security

Security is critical for your application. Supabase uses PostgreSQL's Row Level Security (RLS) to control access to your data:

1. Enable RLS on the table:

```sql
-- Enable Row Level Security
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
```

2. Create security policies:

```sql
-- Allow anyone to insert an email (for subscribing)
CREATE POLICY "Anyone can subscribe" ON email_subscriptions
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated admin users to view subscribers
CREATE POLICY "Only admins can view subscribers" ON email_subscriptions
  FOR SELECT USING (
    auth.role() = 'authenticated' AND 
    auth.email() IN ('your-admin-email@example.com')
  );

-- Only allow users to delete their own subscription
CREATE POLICY "Users can unsubscribe themselves" ON email_subscriptions
  FOR DELETE USING (email = current_setting('request.jwt.claims')::json->>'email');
```

### Connecting Supabase to Your Application

1. Get your Supabase credentials:
   - In your Supabase project dashboard, go to "Settings" > "API"
   - Copy your project URL and anon key

2. Create a Supabase client file in your project (if it doesn't already exist):

```typescript
// File: .vitepress/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// These values should ideally come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "your-supabase-url"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

3. Create a component for newsletter subscriptions (an example):

```vue
<!-- File: .vitepress/theme/EmailSignup.vue -->
<template>
  <div class="email-signup-container">
    <h3>Subscribe to our Newsletter</h3>
    <form @submit.prevent="handleSubmit">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Enter your email" 
        required
      />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
      </button>
    </form>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const email = ref('')
const isLoading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase
      .from('email_subscriptions')
      .insert([{ email: email.value }])
    
    if (error) throw error
    
    isSuccess.value = true
    message.value = 'Thank you for subscribing!'
    email.value = ''
  } catch (error) {
    isSuccess.value = false
    if (error.code === '23505') {
      message.value = 'You are already subscribed!'
    } else {
      message.value = 'Failed to subscribe. Please try again.'
      console.error('Error:', error)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.email-signup-container {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

form {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
```

4. Make sure to import and use the component where needed, such as in your theme layout or specific pages.

## Setting Up Giscus Comments

[Giscus](https://giscus.app/) is a comments system powered by GitHub Discussions. It's a great way to add comments to your static site without needing a database.

### Creating a GitHub Discussion Repository

1. Create a public GitHub repository or use an existing one that will host your discussions.

2. Enable Discussions in your repository:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Features" section
   - Check the box next to "Discussions"
   - Click "Set up discussions" on the Discussions tab
   - Configure categories as needed (you'll need at least one category for Giscus)

3. Install the Giscus GitHub App:
   - Visit [https://github.com/apps/giscus](https://github.com/apps/giscus)
   - Click "Install"
   - Select the repository where you enabled discussions
   - Confirm the installation

### Integrating Giscus into VitePress

1. Create a Comments component:

```vue
<!-- File: .vitepress/theme/Comments.vue -->
<template>
  <section class="comments-container">
    <h2>Comments</h2>
    <div class="giscus-container" ref="giscusContainer"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const giscusContainer = ref(null)
const route = useRoute()
const { isDark } = useData()

// Load and initialize Giscus
const loadGiscus = () => {
  if (!giscusContainer.value) return
  
  // Remove previous instance if it exists
  const previousScript = document.querySelector('.giscus-script')
  if (previousScript) previousScript.remove()
  
  // Clear container
  while (giscusContainer.value.firstChild) {
    giscusContainer.value.removeChild(giscusContainer.value.firstChild)
  }
  
  // Configure Giscus - get these values from https://giscus.app
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.dataset.repo = 'your-username/your-repo'  // REPLACE WITH YOUR REPO
  script.dataset.repoId = 'YOUR_REPO_ID'  // REPLACE WITH YOUR REPO ID
  script.dataset.category = 'Announcements'  // REPLACE WITH YOUR CATEGORY NAME
  script.dataset.categoryId = 'YOUR_CATEGORY_ID'  // REPLACE WITH YOUR CATEGORY ID
  script.dataset.mapping = 'pathname'
  script.dataset.strict = '0'
  script.dataset.reactionsEnabled = '1'
  script.dataset.emitMetadata = '0'
  script.dataset.inputPosition = 'top'
  script.dataset.theme = isDark.value ? 'dark' : 'light'
  script.dataset.lang = 'en'
  script.crossOrigin = 'anonymous'
  script.async = true
  script.className = 'giscus-script'
  
  giscusContainer.value.appendChild(script)
}

// Load Giscus on component mount
onMounted(loadGiscus)

// Reload Giscus when route changes
watch(() => route.path, loadGiscus)

// Update theme when dark mode changes
watch(() => isDark.value, (newValue) => {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: newValue ? 'dark' : 'light' } } },
      'https://giscus.app'
    )
  }
})
</script>

<style scoped>
.comments-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus-container {
  margin-top: 1.5rem;
}
</style>
```

2. Get your Giscus configuration:
   - Visit [https://giscus.app/](https://giscus.app/)
   - Fill in your repository information
   - Select the discussion mapping method (typically "pathname" works well)
   - Choose your discussion category
   - Copy the generated script data attributes

3. Update your theme to include the Comments component:

```js
// File: .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import Comments from './Comments.vue'
import EmailSignup from './EmailSignup.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Comments', Comments)
    app.component('EmailSignup', EmailSignup)
  },
  setup() {
    // Theme setup
  },
  // Add the Comments component to your layout
  Layout() {
    return {
      // Your layout configuration
    }
  }
}
```

4. To include comments in your markdown pages:

```md
---
title: My Blog Post
---

# My Blog Post

Content goes here...

<ClientOnly>
  <Comments />
</ClientOnly>
```

5. To exclude comments on specific pages, you can use frontmatter:

```md
---
title: My Page Without Comments
comments: false
---
```

And then update your Comments component to check for this:

```vue
<template>
  <section v-if="showComments" class="comments-container">
    <!-- Comments content -->
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const showComments = computed(() => frontmatter.value.comments !== false)
// ...rest of script
</script>
```

## Deployment Options

Let's look at deploying your VitePress site to two popular platforms: Azure Static Web Apps and Vercel.

### Deploying to Azure Static Web Apps

Azure Static Web Apps is a service that automatically builds and deploys full stack web apps to Azure from a GitHub repository.

#### Step 1: Prepare Your Repository

Make sure your repository is pushed to GitHub and includes the following files:
- `package.json` with the build scripts
- `.vitepress` directory with configuration
- Your content in Markdown files

#### Step 2: Create an Azure Static Web App

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Click "Create a resource"
3. Search for and select "Static Web App"
4. Click "Create"
5. Fill in the basic details:
   - Subscription: Choose your Azure subscription
   - Resource Group: Create new or use existing
   - Name: Choose a unique name for your app
   - Hosting Plan: Choose your plan (Free tier is available)
   - Region: Select the region closest to your users

6. Connect to GitHub:
   - Sign in to your GitHub account
   - Select the organization, repository, and branch

7. Configure the build settings:
   - Build Presets: Select "Custom"
   - App location: "/" (root of your repo)
   - Api location: "api" (or leave empty if not using functions)
   - Output location: ".vitepress/dist" (VitePress build output)

8. Click "Review + create", then "Create" to deploy your app

#### Step 3: Configure Environment Variables

1. Once your Static Web App is created, go to its resource in the Azure portal
2. Navigate to "Configuration" under "Settings"
3. Add your environment variables:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Click "Save" to apply the changes

#### Step 4: Set Up a GitHub Actions Workflow

Azure Static Web Apps automatically creates a GitHub Actions workflow file in your repository. You may want to customize it to ensure it correctly builds your VitePress site:

```yaml
# File: .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Build
        run: yarn docs:build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          
      - name: Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/" 
          output_location: ".vitepress/dist"
          api_location: ""
```

5. Make sure to add your secrets (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in your GitHub repository settings under "Settings" > "Secrets" > "Actions".

### Deploying to Vercel

Vercel provides an even simpler deployment process, especially for frontend applications like VitePress sites.

#### Step 1: Set Up Vercel Account

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Connect your GitHub account if you haven't already

#### Step 2: Import Your Repository

1. Click "Add New..." > "Project" on your Vercel dashboard
2. Select your GitHub repository from the list
3. Configure your project:
   - Framework Preset: Select "Other" (or "Vite" if available)
   - Project Name: Keep default or customize
   - Root Directory: Leave as `.` (root)
   - Build Command: Override with `yarn docs:build`
   - Output Directory: Override with `.vitepress/dist`

4. Click "Deploy" to start the deployment process

#### Step 3: Configure Environment Variables

1. Once deployed, go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Select the environments where they should apply (Production, Preview, Development)
5. Click "Save"

#### Step 4: Configure Custom Domain (Optional)

1. In your project on Vercel, go to "Settings" > "Domains"
2. Add your custom domain and follow the DNS configuration instructions

## Environment Variables and Security

Protecting sensitive information is crucial in any web application. Here's how to properly handle environment variables:

### For Local Development

Create a `.env` file in the root of your project:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Make sure to add `.env` to your `.gitignore` file to prevent accidentally committing it.

### For Production

As shown in the deployment sections, add these environment variables in your deployment platform (Azure or Vercel).

### Using Environment Variables in Your Code

Access environment variables in your code using the `import.meta.env` object:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

## Troubleshooting Common Issues

### Build Failures

**Issue**: Build fails with "Module not found" errors.
**Solution**: Ensure all dependencies are properly installed and that package versions are compatible.

```bash
# Update dependencies
yarn upgrade

# Clear cache and reinstall
yarn cache clean
rm -rf node_modules
yarn install
```

### Supabase Connection Issues

**Issue**: Unable to connect to Supabase.
**Solution**: Check your environment variables and ensure they're correctly set in both development and production environments.

Also, verify that your Supabase project is active and that the API keys are correct.

### Giscus Not Loading

**Issue**: Giscus comments aren't appearing on your site.
**Solution**: 

1. Ensure the Giscus app is properly installed on your GitHub repository
2. Check that you've correctly copied the repository ID and category ID
3. Verify that the repository has discussions enabled
4. Check browser console for any errors

### CORS Errors

**Issue**: Cross-Origin Resource Sharing (CORS) errors when connecting to Supabase.
**Solution**: Configure CORS settings in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to "API" > "Settings"
3. Add your website's domain to the "Additional Allowed Websites" section

## Conclusion

You now have a fully functional VitePress blog with Supabase for data storage and Giscus for comments, deployed to either Azure Static Web Apps or Vercel. This setup provides a robust platform for your documentation or blog site with minimal maintenance overhead.

By leveraging these modern tools and services, you can focus on creating great content while providing a smooth experience for your users. The serverless architecture ensures scalability, while Supabase and Giscus add powerful functionality to your static site.

Remember to keep your environment variables secure and regularly update your dependencies to maintain security and compatibility.

Happy blogging!
