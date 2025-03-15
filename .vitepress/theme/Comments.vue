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
  
  // Create script
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.dataset.repo = 'Penify-dev/penify-discussions' // Updated to your actual repo name
  script.dataset.repoId = 'R_kgDOOBxgmA' // This needs to be updated with the correct repo ID
  script.dataset.category = 'Announcements' // This may need to be updated
  script.dataset.categoryId = 'DIC_kwDOOBxgmM4Cnexr' // This needs to be updated with the correct category ID
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
