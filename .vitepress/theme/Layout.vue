<template>
  <Layout>
    <template #aside-bottom>
      <ShareButtons />
    </template>
    <template #doc-footer-before>
      <AuthorInfo />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import AuthorInfo from './AuthorInfo.vue'


const { Layout } = DefaultTheme
</script>
