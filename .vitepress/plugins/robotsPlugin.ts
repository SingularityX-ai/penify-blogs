import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

export function robotsPlugin(options: { hostname: string }): Plugin {
  return {
    name: 'vitepress-robots-plugin',
    closeBundle() {
      const outputDir = path.resolve('.vitepress/dist')
      const robotsPath = path.resolve(outputDir, 'robots.txt')
      
      const robotsContent = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${options.hostname}/sitemap.xml
`
      
      fs.writeFileSync(robotsPath, robotsContent)
      console.log('robots.txt generated successfully')
    }
  }
}
