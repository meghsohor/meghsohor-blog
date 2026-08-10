// Same algorithm as the old Gatsby site so tag URLs stay identical
export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export const tagCounts = (posts: { data: { tags: string[] } }[]): [string, { name: string; count: number }][] => {
  const tagMap = new Map<string, { name: string; count: number }>()
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag)
      const entry = tagMap.get(slug)
      if (entry) entry.count++
      else tagMap.set(slug, { name: tag, count: 1 })
    }
  }
  return [...tagMap.entries()].sort((a, b) => b[1].count - a[1].count)
}
