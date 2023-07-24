/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Static files'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Static files',
    description: 'Handling static assets in your Atlet web app',
    link: 'https://atlet.deno.dev/docs/static-files',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Static files"
      previous={{ href: '/docs/relay', name: 'Relay' }}
      next={{ href: '/docs/forms', name: 'Forms' }}>
      
      <DocumentationSection {...props}>
        <p>
          By default, nothing is served statically, but if you want to statically serve some content
          from a folder, you can do so by specifying path to the folder, in a <code>Config</code> object.
        </p>
        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, Config, h, Fragment } from '${Deno.env.get('ATLET_URL')}'

            const config: Config = {
              static: './static',
            }

            const handler = await createHandler({
              '/': () => <img src="/cat.png" alt="an ordinary cat basically" />
            }, config)

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
        <p>
          For example, this cat was loaded from the static folder in this documentation. 
          <img src="/img/cat.png" alt="an ordinary cat basically" class="h-10 w-10 ml-3 inline rounded-lg shadow-lg" />
        </p>
      </DocumentationSection>
    </DocumentationPage>
  )
})