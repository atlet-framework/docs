/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.1/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Routes'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Routes',
    description: 'Writing your custom routes and endpoints using Atlet',
    link: 'https://atlet.deno.dev/docs/routes',
  }))

  return (
    <DocumentationPage 
      {...props}
      title="Routes" 
      previous={{ href: '/docs/intro', name: 'Intro' }} 
      next={{ href: '/docs/props', name: 'Props' }}>
        
      <p>Atlet allows you to write routes in variety of ways. Let's check some of them.</p>
      
      <DocumentationSection {...props} title="JSX" id="jsx">
        <p>Your routes can just return JSX component, which will be rendered as HTML. </p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/': (props: Props) => (
                <h1>Hello from {props.url.hostname}</h1>
              )
            })
            
            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>Since everything in here is primarily SSR, you can even write async routes which are returning JSX.</p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import Database from 'legit-db'

            const handler = await createHandler({
              '/': async (props: Props) => {
                const post = await Database.getRandomPost()

                return (
                  <div>
                    <h1>{post.title}</h1>
                    <p>{post.text}</p>
                  </div>
                )
              }
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>
          Of course, you don't have to have all of the component definitions in one file. You can write your components 
          in a separate files, and reference them later.
        </p>

        <SyntaxHighlight
          filename="Posts.tsx"
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import Database from 'legit-db'

            export default async function Posts(props: Props) {
              const posts = await Database.getAllPosts()

              return (
                <>
                  {posts.map((post) => (
                    <div>
                      <h1>{post.title}</h1>
                      <p>{post.text}</p>
                    </div>
                  ))}
                </>
              )
            }
          `}
        />
        
        <SyntaxHighlight
          filename="main.tsx"
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import Posts from './Posts.tsx'

            const handler = await createHandler({
              '/posts': Posts, // This will work
              '/posts-idk': (props: Props) => (
                <Posts {...props} />, // This will also work
              )
            })
          `}
        />

        <p>
          By default, every page is rendered with this HTML template. The only thing which you can currently
          modify is the <code>head</code> part and the language of the <code>html</code> part.
        </p>

        <SyntaxHighlight
          language="xml"
          code={`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <!-- Your content is injected here -->
            </html>
          `}
        />
      </DocumentationSection>

      <DocumentationSection {...props} title="HTTP responses" id="http-responses">
        <p>If you just want to return Deno's builtin <code>Response</code> object.</p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/api/json': () => {
                return new Response(JSON.stringify({ msg: 'Hello' }), {
                  status: 200,
                })
              },
              '/redirect': () => {
                return new Response(null, {
                  status: 302,
                  headers: {
                    Location: '/some-other-web',
                  },
                })
              }
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>Or you can use builtin utility methods for returing just basic data.</p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { Props, h, Fragment, json, text, redirect } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/api/json': () => json({
                msg: 'Hello',
              }),
              '/api/text': () => text('Hello'),
              '/redirect': () => redirect('/some-other-web')
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>

      <DocumentationSection {...props} title="Route params" id="route-params">
        <p>
          Atlet also allows you to write very simple dynamic routes with dynamic parameters. You can define them using 
          a colon, and later extract them from the <code>props.params</code> object.
        </p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/hello/:name': (props: Props) => (
                <h1>Hello {props.params.name}</h1>
              )
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>
    </DocumentationPage>
  )
})
