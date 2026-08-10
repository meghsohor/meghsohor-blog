import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { site } from '../config'

export async function GET(context) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  const container = await AstroContainer.create()

  const items = await Promise.all(
    posts.map(async post => {
      const { Content } = await post.render()
      const content = await container.renderToString(Content)
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        content,
      }
    }),
  )

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items,
  })
}
