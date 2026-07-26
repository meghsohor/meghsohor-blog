import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../config'

export const GET: APIRoute = async ({ site: astroSite }) => {
  const base = astroSite?.toString().replace(/\/$/, '') ?? site.siteURL

  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  const portfolio = (await getCollection('portfolio')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  const postSections = posts
    .map(
      post => `## ${post.data.title}

URL: ${base}/blog/${post.slug}/
Date: ${post.data.date.toISOString().slice(0, 10)}
Tags: ${post.data.tags.join(', ')}

${post.body}`,
    )
    .join('\n\n---\n\n')

  const portfolioSections = portfolio
    .map(
      project => `## ${project.data.title}

Live link: ${project.data.link}
Tags: ${project.data.tags.join(', ')}

${project.body}`,
    )
    .join('\n\n---\n\n')

  const body = `# ${site.title} — Full Content

> ${site.description}

By ${site.authorName} (${base}). This file contains the complete text of every blog post and portfolio project for ingestion by AI agents and crawlers. See [llms.txt](${base}/llms.txt) for a lightweight index instead.

# Blog Posts

${postSections}

# Portfolio

${portfolioSections}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
