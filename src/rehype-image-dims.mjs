// Rehype plugin: gives every post-body <img> that points at public/images
// its real width/height (no layout shift), lazy loading + async decode, and
// a Netlify Image CDN srcset (plain paths off Netlify — see image-cdn.mjs).
import path from 'node:path'
import sharp from 'sharp'
import { cdnImage, ARTICLE_WIDTHS, ARTICLE_SIZES } from './image-cdn.mjs'

const cache = new Map()

function dims(publicSrc) {
  let cached = cache.get(publicSrc)
  if (!cached) {
    cached = sharp(path.join(process.cwd(), 'public', publicSrc))
      .metadata()
      .then(m => (m.width && m.height ? { width: m.width, height: m.height } : null))
      .catch(() => null)
    cache.set(publicSrc, cached)
  }
  return cached
}

export default function rehypeImageDims() {
  return async tree => {
    const jobs = []
    const walk = node => {
      if (node.tagName === 'img' && typeof node.properties?.src === 'string' && node.properties.src.startsWith('/images/')) {
        const props = node.properties
        jobs.push(
          dims(props.src).then(size => {
            if (size && !props.width && !props.height) {
              props.width = size.width
              props.height = size.height
            }
            props.loading ??= 'lazy'
            props.decoding ??= 'async'
            const cdn = cdnImage(props.src, size?.width, ARTICLE_WIDTHS)
            props.src = cdn.src
            if (cdn.srcset) {
              props.srcset = cdn.srcset
              props.sizes = ARTICLE_SIZES
            }
          }),
        )
      }
      if (node.children) node.children.forEach(walk)
    }
    walk(tree)
    await Promise.all(jobs)
  }
}
