/**@jsx h */
import { h } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import hljs from 'https://esm.sh/highlight.js@11.8.0/lib/core'
import typescript from 'https://esm.sh/highlight.js@11.8.0/lib/languages/typescript'
import xml from 'https://esm.sh/highlight.js@11.8.0/lib/languages/xml'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

export default function SyntaxHighlight(props: { code: string, filename?: string, language?: string }) {
  let count = 0

  while (count < props.code.length) {
    if (![' ', '\n', '\r'].includes(props.code.charAt(count++))) {
      break
    }
  }

  props.code = props.code.replaceAll(' '.repeat(count - 2), '').trim()
  props.code = hljs.highlight(props.code, {
    language: props.language ?? 'typescript',
  }).value

  return (
    <div>
      {props.filename && (
        <span class="ml-4 px-3 py-1 text-sm rounded-t-lg bg-slate-950 text-gray-200 font-medium inline-block">{props.filename}</span>
      )}
      <div class="sm:py-4 sm:px-5 py-2 px-3 bg-gray-800 shadow-lg rounded-md border border-white/5 overflow-x-auto">
        <pre class="text-white text-sm leading-6" dangerouslySetInnerHTML={{__html: props.code}}></pre>
      </div>
    </div>
  )
}