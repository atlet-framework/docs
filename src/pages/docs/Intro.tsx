/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.0.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Intro'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Introduction',
    description: 'Introduction to the Atlet web framework',
    link: 'https://atlet.deno.dev/docs/intro',
  }))

  return (
    <DocumentationPage {...props} title="Intro" next={{ href: '/docs/routes', name: 'Routes' }}>
      <DocumentationSection {...props} title="Getting started" id="getting-started">
        <p>To begin a project with Atlet, import the <code>createHandler</code> function from the <code>TODO</code>.</p>
        
        <SyntaxHighlight
          code={`
            import { createHandler } from '${Deno.env.get('ATLET_URL')}'
          `}
        />

        <p>
          To properly use JSX, you have to add this pragma comment at the begininng of the file to tell Deno,
          which rendering function to use. There is certainly a better way to make this library in
          such a way, that this won't be needed. But not right now.
        </p>
        
        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { createHandler, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
          `}
        />

        <p>Okay, let's actually write something.</p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Props, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/': (props: Props) => (
                <h1>Hello from {props.url.hostname}</h1>
              )
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
        
        <p>
          Right now, we just made a very basic website which will return a heading text with the current path. 
          Now, let's check some other ways you can write endpoints.
        </p>
      </DocumentationSection>
    </DocumentationPage>
  )
})
