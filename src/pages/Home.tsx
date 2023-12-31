/** @jsx h */
/** @jsxFrag Fragment */
import { Props, h, Fragment, withLayout } from 'https://deno.land/x/atlet@1.4.1/mod.ts'
import Layout from '../layouts/Layout.tsx'
import { seo } from "../plugins/seo.tsx";
import SyntaxHighlight from "../plugins/highlight/SyntaxHighlight.tsx";

export default withLayout(Layout, (props: Props) => {
  props.page.head.push(...seo({
    title: 'Atlet 🏃',
    description: 'Yet another, blazingly fast web framework.',
    link: 'https://atlet.deno.dev/',
  }))
  
  return (
    <div class="space-y-4 lg:space-y-7 mt-4 px-4">
      <div class="space-y-2">
        <h1 class="text-5xl">Atlet</h1>
        <h3 class="opacity-50">Yet another web framework.</h3>
      </div>

      <div class="flex lg:flex-row flex-col gap-4">
        <div class="flex-1 space-y-4">
          <p>
            As cliché as it sounds, Atlet was built with simplicity in mind. Sometimes, it might
            be slightly overwhelming to do even something simple, using modern tools and frameworks.
          </p>

          <p>
            Now don't get me wrong, framworks such as Svelte, Vue, React, Angular, Solid and bunch more,
            they are doing an incredible job to provide developers with reliable tools, capable of 
            building huge, reliable and complex websites <b>and you should primarily use those </b>
            if you're building something serious.
          </p>

          <p>
            But in case you don't, or you're fully aware of what you're doing and you just want to quickly 
            write or prototype something, this might be the tool for you :)
          </p>
        </div>
        <div class="lg:w-1/2 space-y-2">
          <SyntaxHighlight
            code={`
              /**@jsx h */
              import { serve } from 'https://deno.land/std/http/server.ts'
              import { createHandler, Props, h } from '${Deno.env.get('ATLET_URL')}'

              const handler = await createHandler({
                '/': (props: Props) => (
                  <body>
                    <h1>Hello, world!</h1>
                  </body>
                )
              })

              // you can also use Deno.serve which is available in Deno 1.35
              serve(handler)
            `}
          />
          <p class="text-center opacity-50">Example of a simple webapp, written in Atlet</p>
        </div>
      </div>

      <div class="flex justify-center pb-6">
        <a href="/docs" class="py-4 px-5 rounded-sm font-medium inline-flex space-x-3 items-center bg-gray-400/10 group hover:bg-gray-400/5">
          <span class="group-hover:underline">Go to the Documentation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white w-6 h-6" viewBox="0 -960 960 960" alt="arrow forward">
            <path d="M662.08-442.123H153.304v-75.754H662.08L426.384-753.573 480-806.855 806.855-480 480-153.304l-53.616-53.123L662.08-442.123Z"/>
          </svg>
        </a>
      </div>
    </div>
  )
})
