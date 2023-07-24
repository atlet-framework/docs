/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, (props: Props) => {
  props.page.title = 'Config'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Config',
    description: 'Configuration for your Atlet project',
    link: 'https://atlet.deno.dev/docs/config',
  }))

  return (
    <DocumentationPage {...props} title="Config" previous={{ href: '/docs/interactivity', name: 'Interactivity' }}>
      <DocumentationSection {...props}>
        <p>Config object let's you, well, configure your Atlet application.</p>
        <p>Here is the overall type definition of the <code>Config</code> object:</p>
      </DocumentationSection>

      <SyntaxHighlight 
          code={`
            export type Config = {
              static?: string
              unoCSS?: boolean
            }
          `}
        />

      <DocumentationSection {...props} title="Static" id="static">
        <p>
          With static, you can set a relative path to the folder with your static assets, for example <code>"./static"</code>. Check more
          in the <a href="/docs/static-files" class="hover:underline font-medium text-indigo-500">Static files</a> section.
        </p>
      </DocumentationSection>

      <DocumentationSection {...props} title="UnoCSS" id="unocss">
        <p>
          Atlet comes in with a builtin support for <a href="https://unocss.dev/" class="hover:underline font-medium text-indigo-500">UnoCSS</a>,
          which is a CSS atomic library, similair to the <a href="https://tailwindcss.com/" class="hover:underline font-medium text-indigo-500">Tailwind</a>.
        </p>
        <p>
          When set to <code>true</code>, it will generate all necessary CSS classes, which are used in your components. 
        </p>
      </DocumentationSection>
    </DocumentationPage>
  )
})
