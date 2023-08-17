/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Props'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Props',
    description: 'How to work with incomming data in Atlet, using Props',
    link: 'https://atlet.deno.dev/docs/props',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Props"
      previous={{ href: '/docs/routes', name: 'Routes' }}
      next={{ href: '/docs/context', name: 'Context' }}>

      <DocumentationSection {...props}>
        <p>
          By default, each route in Atlet is provided with special <code>Props</code> object, which not only contains 
          useful information about the request, but also gives the control to tweak the final result of the endpoint.  
        </p>
        <p>Here is the overall type definition of the <code>Props</code> object:</p>
        <SyntaxHighlight 
          code={`
            type Context = Record<string, unknown>  
            
            export type Props<T extends Context = Context> = {
              request: Request
              params: Record<string string>
              query: URLSearchParams
              ctx: T
              headers: Headers
              children: Array<Node<unknown>>
              url: URL
              page: {
                title: string
                lang: string
                head: Array<Node<unknown>>
              }
            }
          `}
        />
      </DocumentationSection>

      <DocumentationSection {...props} title="Request" id="request">
        <p>
          Request object is a Deno's builtin object, which contains the information about the, well, 
          incomming request. To learn more about visit the official <a href="https://deno.land/api?s=Request" class="hover:underline text-indigo-500 font-medium">Deno Documentation for the Request</a>.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="Route params (params)" id="params">
        <p>Params is a primitive object which, depending on a route definition, might contain route parameters.</p>
      </DocumentationSection>
      
      <DocumentationSection {...props} title="Query string (query)" id="query-string">
        <p>
          Query is an instance of a Deno's builtin object <code>URLSearchParams</code> which contains 
          parsed and potentially existing query parameters. 
        </p>
        <p>Example:</p>
        
        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { search } from 'legit-search'

            const handler = await createHandler({
              '/': (props: Props) => {
                const searchQuery = props.query.get('search')
                const results = searchQuery ? search(searchQuery) : []

                return (
                  <section>
                    <form>
                      <input type="search" name="search" />
                    </form>
                    {results.map((item) => (
                      <p>{item}</p>
                    ))}
                  </section>
                )
              }
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>
      
      <DocumentationSection {...props} title="Context" id="context">
        <p>
          Context object is a primitive object which allows you to pass data from the layout or middleware, to the actual endpoint. 
          Learn more in the <a href="/docs/context" class="hover:underline text-indigo-500 font-medium">Context</a> section.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="Headers" id="headers">
        <p>
          Headers object is a Deno's builtin object, which allows you to control the response headers, 
          either by appending them or rewriting them completely. 
        </p>
        <p>This is useful when you want to, for example, set a cookie for the client.</p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { setCookie } from 'https://deno.land/std/http/cookie.ts'

            const handler = await createHandler({
              '/': (props: Props) => {
                setCookie(props.headers, {
                  name: 'cookie_name',
                  value: 'nomnom',
                  maxAge: 500,
                })

                return (
                  <h1>🍪🍪🍪</h1>
                )
              }
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>
          To learn more visit the official <a href="https://deno.land/api?s=Headers" class="hover:underline text-indigo-500 font-medium">Deno Documentation for the Headers</a>.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="Children" id="children">
        <p>Children array is just an array of possibly incomming children nodes, just like in every framework which supports JSX. </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="URL" id="url">
        <p>
          URL object is a Deno's builtin object, which contains information about the currently visited 
          url, such as hostname, pathname, port, href, origin and more. To learn more visit the 
          official <a href="https://deno.land/api?s=URL" class="hover:underline text-indigo-500 font-medium">Deno Documentation for the URL</a>.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="Page" id="page">
        <p>
          Page object allows you to:
          <ul class="list-disc">
            <li class="ml-7">Change the language of the website. The default option is <code>en</code>, and is directly injected into the <code>html</code> tag.</li>
            <li class="ml-7">Change the title of the website.</li>
            <li class="ml-7">Add meta, link, style, script tags and more, for the given page.</li>
          </ul>
        </p>
        <p>Here are some examples:</p>
        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/': (props: Props) => {
                props.page.title = 'Yes, this is an about section.'

                return (
                  <h1>Is this about section ?</h1>
                )
              },
              '/pink-text': (props: Props) => {
                props.page.head.push(
                  <link rel="stylesheet" href="/pink-text-ftw.css" />,
                  <script src="/script-specific-for-this-page.js" />,
                )

                return (
                  <h1 class="pink-text">I want to be pink</h1>
                )
              }
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>
    </DocumentationPage>
  )
})
