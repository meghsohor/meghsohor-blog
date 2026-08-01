import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../config'

export const GET: APIRoute = async ({ site: astroSite }) => {
  const base = astroSite?.toString().replace(/\/$/, '') ?? site.siteURL

  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  const portfolio = (await getCollection('portfolio')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  const postLines = posts.map(post => `- [${post.data.title}](${base}/blog/${post.slug}/): ${post.data.description}`).join('\n')

  const portfolioLines = portfolio.map(project => `- [${project.data.title}](${project.data.link})`).join('\n')

  const body = `# ${site.title}

> ${site.description}

By ${site.authorName}. Full text of every post is available as plain markdown at each post's URL with a \`.md\` suffix (e.g. \`${base}/blog/<slug>.md\`), and as one combined file at [llms-full.txt](${base}/llms-full.txt).

## Blog Posts

${postLines}

## Portfolio

${portfolioLines}

## Pages

- [All tags](${base}/tags/)
- [Search](${base}/search/)

## Optional

- [RSS feed](${base}/rss.xml)
- [Sitemap](${base}/sitemap-index.xml)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
