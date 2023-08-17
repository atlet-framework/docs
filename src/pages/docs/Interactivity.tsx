/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.3.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Interactivity'
  props.page.head.push(
    ...seo({
      title: 'Atlet Documentation 🏃 - Interactivity',
      description: 'Make your pages interactive',
      link: 'https://atlet.deno.dev/docs/interactivity',
    },
  ))

  return (
    <DocumentationPage 
      {...props} 
      title="Interactivity"
      previous={{ href: '/docs/not-found', name: 'Not found' }}
      next={{ href: '/docs/config', name: 'Config' }}>
      
      <DocumentationSection {...props}>
        <p>
          Having SSR is all fun and games, however sometimes you might want to have some dynamic or
          interactive content on your website. Since Atlet is primarily SSR focused, there is no
          builtin way to make components dynamic (unlike Deno's 
          Fresh <a href="https://fresh.deno.dev/docs/concepts/islands" class="hover:underline text-indigo-500 font-medium">Interactive islands</a>).
        </p>
        <p>
          However, it doesn't stop you from using popular libraries, such 
          as <a href="https://github.com/vuejs/petite-vue" class="hover:underline text-indigo-500 font-medium">petite-vue</a>,&nbsp;
          <a href="https://alpinejs.dev/" class="hover:underline text-indigo-500 font-medium">alpine.js</a>,
          or even a full-fledged <a href="https://vuejs.org/guide/quick-start.html#using-vue-from-cdn" class="hover:underline text-indigo-500 font-medium">Vue</a>, with small caveats.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="First example" id="first-example">
        <p>Here is an example of using petite-vue in Atlet page.</p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            
            export default function Page(props: Props) {
              props.page.head.push(
                <script src="/petite-vue.js" />,
              )

              return (
                <div v-scope="{ count: 0 }">
                  <!-- {{ count }} in this example must be escaped, because -->
                  <!-- otherwise it will get evaluated on the server. -->
                  <p>Current count is {'{{ count }}'}</p>

                  <!-- In case of petite-vue, you can't use event listeners with '@' prefix, -->
                  <!-- because having '@' in JSX is not valid, hence leading to an error. -->
                  <button v-on:click="count++">Increment</button>
                </div>
              )
            }
          `}
        />

        <p>Result:</p>

        <div class="border border-gray-300 p-4 bg-white rounded-md">
          <div v-scope="{ count: 0 }">
            <p>Current count is {'{{{ count }}}'}</p>
            <button v-on:click="count++" class="bg-gray-800 py-2 px-3 font-medium text-sm mt-2 rounded-md shadow-md text-white hover:opacity-90">Increment</button>
          </div>
        </div>
      </DocumentationSection>
      
      <DocumentationSection {...props} title="Second example" id="second-example">
        <p>
          Here is a bit more complex example of sending a request without a full page refresh 
        </p>

        <SyntaxHighlight
          filename="fetch.js"
          code={`
            import { createApp } from './petite-vue.js'

            createApp({
              randomNumber: null,
              loading: false,
              async getRandomNumber() {
                this.loading = true
                const response = await fetch('/api/random').then(r => r.json())
                this.loading = false
                this.randomNumber = response.randomNumber
              }
            }).mount()
          `}
        />

        <SyntaxHighlight
          filename="main.tsx"
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Props, h, Fragment, json } from '${Deno.env.get('ATLET_URL')}'
            
            const handler = await createHandler({
              '/api/random': async () => {
                await new Promise(r => setTimeout(r, 1000))
                return json({
                  randomNumber: 1 + Math.random() * 100 | 0,
                })
              },
              '/': (props: Props) => {
                props.page.head.push(
                  <script src="/demo/fetch.js" type="module"></script>,
                )
            
                return (
                  <div v-scope>
                    <h1 v-if="randomNumber">Random number is {'{{ randomNumber }}'}</h1>
                    <button 
                      v-bind:disabled="loading"
                      v-on:click="getRandomNumber">
                      {'{{ loading ? "Loading ..." : "Get random number" }}'}
                    </button>
                  </div>
                )
              }
            }, {
              static: './static'
            })
            
            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>Result:</p>

        <div class="border border-gray-300 p-4 bg-white rounded-md">
          <div v-scope class="space-y-2">
            <h1 v-if="randomNumber">Random number is {'{{{ randomNumber }}}'}</h1>
            <button 
              v-on:click="getRandomNumber"
              v-bind:disabled="loading"
              class="bg-gray-800 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3 font-medium text-sm rounded-md shadow-md text-white">
              {'{{{ loading ? "Loading ..." : "Get random number" }}}'}
            </button>
          </div>
        </div>
      </DocumentationSection>
    </DocumentationPage>
  )
})