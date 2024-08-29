<!-- .vitepress/theme/AuthorInfo.vue -->
<template>
  <div v-if="frontmatter.author" class="author-info">
    <img 
      v-if="frontmatter.image" 
      :src="frontmatter.image" 
      :alt="frontmatter.author" 
      class="author-image"
    />
    <div class="author-details">
      <p class="author-name">{{ frontmatter.author }}</p>
      <a 
        v-if="frontmatter.linkedInUrl" 
        :href="frontmatter.linkedInUrl" 
        target="_blank" 
        rel="noopener noreferrer"
        class="linkedin-button"
      >
        Connect on LinkedIn
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<style scoped>
:root {
  --author-info-border-color: var(--vp-c-divider);
  --author-name-color: var(--vp-c-text-1);
  --linkedin-button-bg: var(--vp-c-brand, #3eaf7c);
  --linkedin-button-hover-bg: var(--vp-c-brand-light, #4abf8a);
  --linkedin-button-hover-bg: var(--vp-c-brand-dark, #4abf8a);
  --linkedin-button-text: var(--vp-c-bg, #ffffff);
}
.author-info {
  display: flex;
  align-items: center;
  margin-top: 3rem;
  padding: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.author-details {
  flex: 1;
}

.author-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.linkedin-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.linkedin-button:hover {
  scale: 1.05;
}

@media (max-width: 640px) {
  .author-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .author-image {
    margin-bottom: 1rem;
  }
}
</style>