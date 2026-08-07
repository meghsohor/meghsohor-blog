// Rehype plugin: wraps each Shiki code block in a <figure> with a header
// strip — language label left, copy button right. Done at build time so the
// header adds no layout shift and the client script only binds click handlers.

// copy + check icons, Font Awesome Free 6.7.2 (CC BY 4.0) — same paths as components/icons.ts
const COPY_ICON =
  '<svg class="icon-copy" viewBox="0 0 448 512" width="0.85em" height="0.85em" fill="currentColor" aria-hidden="true"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>'
const CHECK_ICON =
  '<svg class="icon-check" viewBox="0 0 448 512" width="0.85em" height="0.85em" fill="currentColor" aria-hidden="true"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'

function headerHtml(lang) {
  const label = lang && lang !== 'plaintext' ? lang : ''
  return (
    `<figcaption class="code-block-header"><span class="code-block-lang">${label}</span>` +
    `<button type="button" class="code-copy-btn" aria-label="Copy code">${COPY_ICON}${CHECK_ICON}<span class="code-copy-label">Copy</span></button></figcaption>`
  )
}

const PRE_BLOCK = /<pre class="astro-code[^"]*"[^>]*>[\s\S]*?<\/pre>/g
const LANG_ATTR = /\bdata-language="([^"]*)"/

export default function rehypeCodeHeaders() {
  return tree => {
    const walk = node => {
      if (node.type === 'raw' && node.value.includes('astro-code')) {
        // raw HTML blocks that already carry highlighted markup
        node.value = node.value.replace(PRE_BLOCK, block => {
          const lang = block.match(LANG_ATTR)?.[1] ?? ''
          return `<figure class="code-block">${headerHtml(lang)}${block}</figure>`
        })
      } else if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        // Shiki has already highlighted the block; its `class` property is a plain
        // string (not a className array) and the language sits on the <pre> itself
        const lang = node.properties?.dataLanguage ?? ''
        const inner = { ...node }
        node.tagName = 'figure'
        node.properties = { className: ['code-block'] }
        node.children = [{ type: 'raw', value: headerHtml(lang) }, inner]
        return // don't descend into the block we just rebuilt
      }
      if (node.children) node.children.forEach(walk)
    }
    walk(tree)
  }
}
