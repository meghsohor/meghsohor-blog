// Netlify Image CDN URLs for images in public/ — files never move, so the raw
// /blog/<slug>.md and llms-full.txt image paths keep working. Off Netlify
// (local dev/preview) everything falls back to the plain path.
const ON_NETLIFY = !!process.env.NETLIFY
const TRANSFORMABLE = /\.(jpe?g|png|webp|avif)$/i

export const CARD_WIDTHS = [360, 720, 1080]
export const CARD_SIZES = '(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw'
export const SIDEBAR_SIZES = '(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw'
export const ARTICLE_WIDTHS = [480, 740, 1110, 1480]
export const ARTICLE_SIZES = '(min-width: 1280px) 738px, (min-width: 1024px) 66vw, 100vw'

const cdnUrl = (src, width) => `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}`

/**
 * @param {string} src public path (/images/…)
 * @param {number | null | undefined} intrinsicWidth real pixel width, caps the ladder (no upscales)
 * @param {number[]} widths candidate srcset widths
 * @returns {{ src: string, srcset?: string }}
 */
export function cdnImage(src, intrinsicWidth, widths) {
  if (!ON_NETLIFY || !TRANSFORMABLE.test(src) || !intrinsicWidth) return { src }
  const ladder = widths.filter(w => w < intrinsicWidth)
  const cap = Math.min(intrinsicWidth, Math.max(...widths))
  if (!ladder.includes(cap)) ladder.push(cap)
  const fallback = ladder[Math.floor((ladder.length - 1) / 2)]
  return {
    src: cdnUrl(src, fallback),
    srcset: ladder.map(w => `${cdnUrl(src, w)} ${w}w`).join(', '),
  }
}
