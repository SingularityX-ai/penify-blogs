<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import { pageView, trackLinkClick, inHouseAnalytics } from './analytics'

const route = useRoute()
const { page } = useData()

// Track page view on initial load
onMounted(() => {
  // Force immediate page view tracking
  trackPageView()
  
  // Set up event listeners for interaction tracking
  addLinkClickListeners()
  addButtonClickListeners()
  addScrollTracking()
  
  // Log successful initialization
  console.log('Analytics tracking initialized')
})

function trackPageView() {
  // Track the page view with current URL and referrer
  inHouseAnalytics('pageView', {
    url: window.location.href,
    path: route.path,
    referrer: document.referrer
  })
}

// Track page views on route changes
// This is the VitePress-compatible way to track route changes
watch(() => route.path, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    console.log(`Route changed: ${oldPath} -> ${newPath}`)
    setTimeout(() => {
      // Track page view after route change
      trackPageView()
    }, 100)
  }
})

// Clean up event listeners
onUnmounted(() => {
  removeLinkClickListeners()
  removeButtonClickListeners()
  removeScrollTracking()
})

// Track clicks on links
function addLinkClickListeners() {
  document.addEventListener('click', handleLinkClick)
}

function removeLinkClickListeners() {
  document.removeEventListener('click', handleLinkClick)
}

function handleLinkClick(event) {
  const link = event.target.closest('a')
  if (link && link.href) {
    // Track all link clicks with href, target, and referrer
    inHouseAnalytics('linkClick', { 
      url: link.href,
      text: link.innerText || link.textContent,
      referrer: document.referrer || window.location.href
    })
  }
}

// Track button clicks
function addButtonClickListeners() {
  document.addEventListener('click', handleButtonClick)
}

function removeButtonClickListeners() {
  document.removeEventListener('click', handleButtonClick)
}

function handleButtonClick(event) {
  const button = event.target.closest('button')
  if (button) {
    // Track all button clicks
    inHouseAnalytics('buttonClick', {
      text: button.innerText || button.textContent,
      id: button.id,
      class: button.className,
      referrer: document.referrer || window.location.href
    })
  }
}

// Track scroll depth
let scrollTracker
function addScrollTracking() {
  scrollTracker = new ScrollDepthTracker()
}

function removeScrollTracking() {
  if (scrollTracker) {
    scrollTracker.destroy()
  }
}

// ScrollDepthTracker class to track user scroll depth
class ScrollDepthTracker {
  constructor() {
    this.tracked = {
      '25': false,
      '50': false,
      '75': false,
      '100': false
    }
    this.handleScroll = this.handleScroll.bind(this)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  handleScroll() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return
    
    const scrollPercent = (scrollTop / docHeight) * 100
    
    if (scrollPercent >= 25 && !this.tracked['25']) {
      this.tracked['25'] = true
      inHouseAnalytics('scroll', {
        depth: '25%',
        url: window.location.href,
        referrer: document.referrer
      })
    }
    if (scrollPercent >= 50 && !this.tracked['50']) {
      this.tracked['50'] = true
      inHouseAnalytics('scroll', {
        depth: '50%',
        url: window.location.href,
        referrer: document.referrer
      })
    }
    if (scrollPercent >= 75 && !this.tracked['75']) {
      this.tracked['75'] = true
      inHouseAnalytics('scroll', {
        depth: '75%',
        url: window.location.href,
        referrer: document.referrer
      })
    }
    if (scrollPercent >= 99 && !this.tracked['100']) {
      this.tracked['100'] = true
      inHouseAnalytics('scroll', {
        depth: '100%',
        url: window.location.href,
        referrer: document.referrer
      })
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<template>
  <!-- This component doesn't render anything -->
</template>