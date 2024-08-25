import DefaultTheme from "vitepress/theme";
import "./style.css";
import ShareButtons from './ShareButtons.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ShareButtons', ShareButtons)
  }
}