/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Layouts'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Layouts',
    description: 'How to create and use layouts in Atlet',
    link: 'https://atlet.deno.dev/docs/layouts',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Layouts"
      previous={{ href: '/docs/props', name: 'Props' }}
      next={{ href: '/docs/middleware', name: 'Middleware' }}>

      <DocumentationSection {...props}>
        <p>
          Layouts are an essential part for building user interfaces, with parts of UI which are often reused.
          Atlet allows you to make, and use layouts with builtin <code>withLayout</code> function. Here is an example.
        </p>
        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, withLayout, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const Layout = (props: Props) => (
              <main>
                <nav>
                  <p>I am navbar</p>
                </nav>
                {props.children}
              </main>
            )

            const Page = withLayout(Layout, () => (
              <div>
                <p>I am inside the Layout</p>
              </div>
            ))

            const handler = await createHandler({
              '/': Page,
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />

        <p>
          The <code>withLayout</code> function is just a simple wrapper, which takes two components, adds one into another, and returns
          a component, which's props are passed into both layout and child, giving everyone access to the same props data.
        </p>

        <p>
          You can also nest these layouts as much as you need. The <strike>sky</strike> RAM is the pretty much only limit.
        </p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, withLayout, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const LayoutOne = (props: Props) => (
              <div>
                <h1>Layout 1</h1>
                {props.children}
              </div>
            )

            // We can use the same withLayout function to also create a new layout
            const LayoutTwo = withLayout(LayoutOne, (props: Props) => (
              <div>
                <h1>Layout 2</h1>
                {props.children}
              </div>
            ))

            const Page = withLayout(LayoutTwo, () => (
              <h1>It smells like updog in here.</h1>
            ))

            const handler = await createHandler({
              '/': Page,
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>

    </DocumentationPage>
  )
})