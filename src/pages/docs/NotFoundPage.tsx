/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Not found'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Not found',
    description: 'Handle missing pages and endpoints in Atlet',
    link: 'https://atlet.deno.dev/docs/middleware',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Not found"
      previous={{ href: '/docs/rest-api', name: 'Rest API' }}
      next={{ href: '/docs/interactivity', name: 'Interactivity' }}>

      <DocumentationSection {...props}>
        <p>
          Atlet allows you to define a handler that will be called when a client 
          requests a page or an endpoint that does not exist.
        </p>

        <p>
          You can define this handler using the <code>NOT_FOUND</code> symbol, under 
          which you can define your route function that will return the desired output.
        </p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, NOT_FOUND, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const handler = await createHandler({
              '/': () => (
                <section>
                  <a href="/free-download-page">Go to the free download page</a>
                </section>
              ),
              [NOT_FOUND]: () => (
                <h1>You fool.</h1>
              ),
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>

    </DocumentationPage>
  )
})