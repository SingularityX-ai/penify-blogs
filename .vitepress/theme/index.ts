import DefaultTheme from "vitepress/theme";
import "./style.css";
import ShareButtons from './ShareButtons.vue'
import Layout from './Layout.vue'
import EmailSignup from './EmailSignup.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ShareButtons', ShareButtons)
    app.component('EmailSignup', EmailSignup)
  }
}