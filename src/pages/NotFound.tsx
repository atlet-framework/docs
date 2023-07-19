/** @jsx h */
/** @jsxFrag Fragment */
import { Props, h, Fragment, withLayout } from 'https://deno.land/x/atlet@1.0.0/mod.ts'
import Layout from '../layouts/Layout.tsx'
import { seo } from '../plugins/seo.tsx'

export default withLayout(Layout, (props: Props) => {
  props.page.head.push(...seo({
    title: 'Not found',
    description: 'Page not found :(',
  }))
  
  return (
    <div class="p-4 space-y-3 flex flex-col">
      <h1 class="text-4xl">Not found :(</h1>
      <a href="/" class="text-gray-500 hover:underline">🏠 Go home</a>
    </div>
  )
})
