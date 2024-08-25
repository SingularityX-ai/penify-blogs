<template>
  <div class="share-container">
    <p>Share this post:</p>
    <div class="share-buttons">
      <a
        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${url}`"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          style="width: 30px; height: 30px;"
        />
      </a>
      <a
        :href="`https://twitter.com/intent/tweet?url=${url}&text=${title}`"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
          alt="Twitter"
          style="width: 30px; height: 30px;"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { page } = useData()
const url = `https://blogs.penify.dev/${page.value.relativePath.replace(
  '.md',
  '.html'
)}`
const title = page.value.title
</script>

<style scoped>
.share-container {
  margin-top: 20px;
  text-align: center;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.share-buttons img {
  transition: transform 0.2s;
}

.share-buttons img:hover {
  transform: scale(1.1);
}
</style>
