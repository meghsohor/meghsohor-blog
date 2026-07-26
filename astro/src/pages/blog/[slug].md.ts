import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog')
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }))
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> }

  const body = `# ${post.data.title}

Date: ${post.data.date.toISOString().slice(0, 10)}
Author: ${post.data.author}
Tags: ${post.data.tags.join(', ')}

${post.body}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
