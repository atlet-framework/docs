/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Not found'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Rest API',
    description: 'Write standard Rest API using Atlet',
    link: 'https://atlet.deno.dev/docs/middleware',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Rest API"
      previous={{ href: '/docs/forms', name: 'Forms' }}
      next={{ href: '/docs/not-found', name: 'Not found' }}>

      <DocumentationSection {...props}>
        <p>
          From the version 1.1.0 (yeah it should've been there since day 1 ...), you can now specify HTTP method 
          which you want to listen to, directly in the route path in the Routes object.
        </p>

        <SyntaxHighlight 
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { serve } from 'https://deno.land/std/http/server.ts'
            import { createHandler, json, h, Fragment } from '${Deno.env.get('ATLET_URL')}'
            import Post from 'legit-post'

            const handler = await createHandler({
              'GET /post/:id': async (props) => json(await Post.findById(props.params.id)),
              'POST /post': async (props) => {
                const form = await props.request.formData()
                const newPost = await Post.create({
                  text: form.get('text')?.toString() ?? '',
                })
                return json(newPost)
              },
              'DELETE /post/:id': (props) => {
                await Post.delete(props.params.id)
                return json({ ok: true })
              },
            })

            // you can also use Deno.serve which is available in Deno 1.35
            serve(handler)
          `}
        />
      </DocumentationSection>
    </DocumentationPage>
  )
})