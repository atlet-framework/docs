/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.1/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Context'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Context',
    description: 'Passing data from layouts and middlewares in Atlet',
    link: 'https://atlet.deno.dev/docs/middleware',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Context"
      previous={{ href: '/docs/middleware', name: 'Middleware' }}
      next={{ href: '/docs/static-files', name: 'Static files' }}>

      <p>
        Context is a primitive object which let's you pass data from middleware or layout, to the targeted route.
      </p>

      <DocumentationSection {...props} title="Context in layouts" id="context-in-layouts">
        <p>
          Imagine a scenario, where you have a layout with navbar, in which you want to show a very
          small picture of a currently logged user. No problem, you can just easily fetch user data
          from Database, and show it. However, what if you want to display some information about the
          user in a currently displayed page ? Do you have to fetch user data again ? Well thanks
          to the context, you don't have to.
        </p>
        
        <p>Here is an example of using <code>ctx</code> in middleware:</p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, withLayout, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { getTheoreticallyAuthorizedUser } from 'legit-auth'

            type Context = {
              user: {
                id: string
                name: string
              }
            }

            const Layout = async (props: Props<Context>) => {
              props.ctx.user = await getTheoreticallyAuthorizedUser(props.request)

              return (
                <main>
                  <nav>
                    <img src={props.ctx.user.picture} alt="Your profile picture" />
                  </nav>
                  <section>{props.children}</section>
                </main>
              )
            }

            const Home = withLayout(Layout, (props: Props<Context>) => (
              <h1>Hello {props.ctx.user.name}</h1>
            ))

            const handler = await createHandler({
              '/': Home,
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>

      <DocumentationSection {...props} title="Context in middleware" id="context-in-middleware">
        <p>Example of using <code>ctx</code> in middleware:</p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, MIDDLEWARE, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { getTheoreticallyAuthorizedUser } from 'legit-auth'

            type Context = {
              user: {
                id: string
                name: string
              }
            }

            // You can also pass the type into the createHandler function itself
            const handler = await createHandler<Context>({
              // No need to define Props type, since it's generic version is inferred
              [MIDDLEWARE]: (props) => {
                // TypeScript IntelliSense will work here 😎
                props.ctx.user = await getTheoreticallyAuthorizedUser(props.request)
              },
              '/': (props) => (
                <h1>Logged in as {props.ctx.user.name}</h1>
              )
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>
          Unfortunately, if you want to have your route functions in different files, the inference will break.
          In that case, you can export your type which defines the data in your <code>ctx</code>, and pass it as a generic
          type to the props type. This also applies for using <code>ctx</code> in layouts.
        </p>

        <SyntaxHighlight
          filename="main.tsx"
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, MIDDLEWARE, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import Home from './Home.tsx'

            export type Context = {
              user: {
                id: string
                name: string
              }
            }

            const handler = await createHandler<Context>({
              [MIDDLEWARE]: (props) => {
                props.ctx.user = await getTheoreticallyAuthorizedUser(props.request)
              },
              '/': Home,
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <SyntaxHighlight
          filename="Home.tsx"
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import { Context } from './main.tsx'

            export default function Home(props: Props<Context>) {
              return (
                // Autocompletion will work here (hopefully)
                <h1>Logged in as {props.ctx.user.name}</h1>
              )
            }
          `}
        />
      </DocumentationSection>

    </DocumentationPage>
  )
})