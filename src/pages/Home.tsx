/** @jsx h */
/** @jsxFrag Fragment */
import { Props, h, Fragment, withLayout } from 'https://deno.land/x/atlet@1.0.0/mod.ts'
import Layout from '../layouts/Layout.tsx'
import { seo } from "../plugins/seo.tsx";

export default withLayout(Layout, (props: Props) => {
  props.page.head.push(...seo({
    title: 'Atlet 🏃',
    description: 'Yet another, blazingly fast web framework.',
    link: 'https://atlet.deno.dev/',
  }))
  
  return (
    <div class="space-y-5 mt-4 px-4 dark dark:bg-red-500">
      <h1 class="text-5xl">Atlet</h1>
      <h3 class="text-gray-500">Yet another web framework.</h3>

      <h1 class="text-gray-800">
        The reason why this framework exists is because I wanted to make myself
        a template for quickly making SSR applications, which can be deployed on <a href="https://deno.com/deploy" class="font-medium hover:underline text-indigo-500">Deno Deploy</a>.
      </h1>

      <div>
        <p>With Atlet you can:</p>  
        <ul class="list-disc">
          <li class="list-item ml-7">Use JSX</li>
          <li class="list-item ml-7">Write async components, since everything is SSR only</li>
          <li class="list-item ml-7">Use all your favorite Tailwind classes (thanks to UnoCSS)</li>
          <li class="list-item ml-7">Write standard REST API endpoints</li>
        </ul>
      </div>

      <a href="/docs" class="py-4 px-5 rounded-sm font-medium inline-flex space-x-3 items-center bg-gray-100 text-gray-900 group hover:bg-gray-200">
        <span class="group-hover:underline">Go to the Documentation</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  )
})
