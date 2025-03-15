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
$ git clone https://github.com/Penify-dev/Penify-usage-doc-site
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

### Building for production

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

This will serve the production build locally for testing.

<br>

## Configuring Supabase

[Supabase](https://supabase.com/) is used for storing user data like newsletter subscriptions. Here's how to set it up:

1. Create a Supabase account and start a new project

2. Get your Supabase URL and anon key from the project settings:
   - Go to Project Settings > API
   - Copy the URL and anon key

3. Update the `.vitepress/lib/supabaseClient.ts` file with your credentials:
   ```typescript
   const supabaseUrl = "your-supabase-url"
   const supabaseAnonKey = "your-anon-key"
   ```

4. Set up a table for email subscriptions in Supabase:
   ```sql
   CREATE TABLE email_subscriptions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. Add Row Level Security (RLS) policies:
   ```sql
   -- Enable RLS
   ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

   -- Create policy for inserting emails (anyone can subscribe)
   CREATE POLICY "Anyone can subscribe" ON email_subscriptions
     FOR INSERT WITH CHECK (true);

   -- Create policy for viewing emails (only authenticated users with specific roles)
   CREATE POLICY "Only admins can view subscribers" ON email_subscriptions
     FOR SELECT USING (auth.role() = 'authenticated' AND auth.email() IN ('admin@example.com'));
   ```

<br>

## Setting Up Giscus Comments

[Giscus](https://giscus.app/) is a comments system powered by GitHub Discussions. Follow these steps to set it up:

1. Create a public GitHub repository for hosting discussions (or use an existing one)

2. Enable GitHub Discussions in the repository:
   - Go to your repository settings
   - Scroll down to "Features"
   - Enable "Discussions"

3. Install the [Giscus app](https://github.com/apps/giscus) on your repository

4. Configure Giscus:
   - Visit https://giscus.app/
   - Enter your repository name (format: username/repo)
   - Choose the discussion mapping (recommended: "Discussion title contains page pathname")
   - Select a discussion category (create one if needed)
   - Copy the generated configuration values

5. Update the Giscus configuration in `.vitepress/theme/Comments.vue`:
   ```vue
   script.dataset.repo = 'your-username/your-repo'  
   script.dataset.repoId = 'your-repo-id'
   script.dataset.category = 'Your Category'
   script.dataset.categoryId = 'your-category-id'
   ```

6. Import and use the Comments component in your theme layout:
   ```vue
   <template>
     <div class="content">
       <!-- Your content -->
       <Comments v-if="$frontmatter.comments !== false" />
     </div>
   </template>

   <script setup>
   import Comments from './Comments.vue'
   </script>
   ```

7. To disable comments on specific pages, add `comments: false` to the frontmatter.

<br>

## Environment Variables

For security, store sensitive values in environment variables:

1. Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Update `supabaseClient.ts` to use these environment variables:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

3. Add `.env` to your `.gitignore` file to prevent committing sensitive data
