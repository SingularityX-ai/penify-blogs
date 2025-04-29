<template>
  <Layout>
    <template #aside-bottom>
      <ShareButtons />
      <EmailSignup />
      <Analytics />
    </template>
    <template #doc-footer-before>
      <AuthorInfo />
      <Comments />  
    </template>
    
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import AuthorInfo from './AuthorInfo.vue'
import EmailSignup from './EmailSignup.vue'
import Comments from './Comments.vue'
import Analytics from './Analytics.vue'

const { Layout } = DefaultTheme
</script>