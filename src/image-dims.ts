// Build-time only: reads pixel dimensions of images under public/ so <img>
// tags can carry width/height (no layout shift while they load).
import path from 'node:path'
import sharp from 'sharp'

export interface ImageDims {
  width: number
  height: number
}

const cache = new Map<string, Promise<ImageDims | null>>()

export function publicImageDims(publicPath: string): Promise<ImageDims | null> {
  let cached = cache.get(publicPath)
  if (!cached) {
    cached = sharp(path.join(process.cwd(), 'public', publicPath))
      .metadata()
      .then(m => (m.width && m.height ? { width: m.width, height: m.height } : null))
      .catch(() => null)
    cache.set(publicPath, cached)
  }
  return cached
}
