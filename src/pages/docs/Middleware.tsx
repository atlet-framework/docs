/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.3.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Middleware'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Middleware',
    description: 'Creating custom middlewares in Atlet',
    link: 'https://atlet.deno.dev/docs/middleware',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Middleware"
      previous={{ href: '/docs/layouts', name: 'Layouts' }}
      next={{ href: '/docs/context', name: 'Context' }}>

      <DocumentationSection {...props}>
        <p>
          Middleware is a special function which is called before every route, defined in your handler.
          This allows you to fetch and pass data to every route, cancel the whole request, redirects and more.
        </p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, MIDDLEWARE, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              [MIDDLEWARE]: () => {
                console.log('I was called!')
              },
              '/': () => (
                <h1>So was I.</h1>
              )
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>
          The way you define a middleware function is by importing special symbol <code>MIDDLEWARE</code> under
          which you can define your middleware function. The flow of the middleware function goes in such a way
          that, if not cancelled, it will continue to the targeted endpoint. Let's check out some examples.
        </p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, MIDDLEWARE, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { getCookies } from 'https://deno.land/std/http/cookie.ts'
            import { isUserWithThisCookieAuthorized } from 'legit-auth'

            const handler = await createHandler({
              [MIDDLEWARE]: (props: Props) => {
                const cookie = getCookies(props.request.headers)

                // Innocent until proven guilty
                if (!isUserWithThisCookieAuthorized(cookie)) {
                  // guilty
                  return redirect('https://http.cat/401')
                }

                // innocent; hence letting user to visit /authorized route
              },
              '/authorized': () => <h1>Hello authorized, I'm dad.</h1>
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>Or you can just straight up return a response or JSX content.</p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, MIDDLEWARE, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { getCookies } from 'https://deno.land/std/http/cookie.ts'
            import { isUserWithThisCookieAuthorized } from 'legit-auth'

            const handler = await createHandler({
              [MIDDLEWARE]: () => {
                const rand = Math.random()

                if (rand > 0 && rand < 0.333333333333334) {
                  return new Response('You are not getting anywhere', {
                    status: 401,
                  })
                }

                if (rand > 0.333333333333334 && rand < 0.666666666666667) {
                  return <h1>You are not getting anywhere (but in JSX)</h1>
                }

                // Okay you are going somewhere.
              },
              '/': () => <h1>Hello there</h1>
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>
    </DocumentationPage>
  )
})