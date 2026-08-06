// Rehype plugin: gives every post-body <img> that points at public/images
// its real width/height (no layout shift) plus lazy loading + async decode.
// Post bodies use raw HTML <img> tags, which reach rehype as unparsed `raw`
// nodes — so both element nodes and raw strings are handled.
import path from 'node:path'
import sharp from 'sharp'

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

const IMG_TAG = /<img\b[^>]*>/g
const SRC_ATTR = /\bsrc="(\/images\/[^"]+)"/

async function upgradeRawImgs(value) {
  const tags = value.match(IMG_TAG)
  if (!tags) return value
  let out = value
  for (const tag of tags) {
    const src = tag.match(SRC_ATTR)?.[1]
    let extra = ''
    if (src && !/\bwidth=/.test(tag) && !/\bheight=/.test(tag)) {
      const size = await dims(src)
      if (size) extra += ` width="${size.width}" height="${size.height}"`
    }
    if (!/\bloading=/.test(tag)) extra += ' loading="lazy"'
    if (!/\bdecoding=/.test(tag)) extra += ' decoding="async"'
    if (!extra) continue
    const upgraded = tag.endsWith('/>') ? `${tag.slice(0, -2).trimEnd()}${extra} />` : `${tag.slice(0, -1)}${extra}>`
    out = out.replace(tag, upgraded)
  }
  return out
}

export default function rehypeImageDims() {
  return async tree => {
    const jobs = []
    const walk = node => {
      if (node.type === 'raw' && node.value.includes('<img')) {
        jobs.push(upgradeRawImgs(node.value).then(v => (node.value = v)))
      } else if (node.tagName === 'img' && typeof node.properties?.src === 'string' && node.properties.src.startsWith('/images/')) {
        const props = node.properties
        jobs.push(
          dims(props.src).then(size => {
            if (size && !props.width && !props.height) {
              props.width = size.width
              props.height = size.height
            }
            props.loading ??= 'lazy'
            props.decoding ??= 'async'
          }),
        )
      }
      if (node.children) node.children.forEach(walk)
    }
    walk(tree)
    await Promise.all(jobs)
  }
}
