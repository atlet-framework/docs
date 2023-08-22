/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.4.0/mod.ts'
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
            unocss?: UnoGenerator
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
          To setup UnoCSS, you have to provide your own instance of a <code>UnoGenerator</code>.
        </p>
        <SyntaxHighlight 
          code={`
            const config: Config = {
              static: './static',
              unocss: new UnoGenerator({
                presets: [presetWind()],
              }),
            }
          `}
        />
        <p>
          As mentioned in the <a href="https://unocss.dev/guide/style-reset" class="hover:underline font-medium text-indigo-500">UnoCSS - Browser Style Reset</a> section:
        </p>
        <p class="pl-3 py-2 border-l-2 border-gray-400/20 bg-gray-400/10">
          UnoCSS does not provide style resetting or preflight by default for maximum flexibility and does not populate your global CSS. If you 
          use UnoCSS along with other CSS frameworks, they probably already do the resetting for you. If you 
          use UnoCSS alone, you can use resetting libraries like Normalize.css.
        </p>
        <p>
          If you want to reset your CSS, you can do so by adding a <code>link</code> element to either your middleware, or your layout.
        </p>
        <SyntaxHighlight 
          code={`
            const handler = await createHandler({
              [MIDDLEWARE]: (props) => {
                // In this case, the <link/> will only be included to the pages which are using JSX.
                props.page.head.push(
                  <link rel="stylesheet" href="https://esm.sh/@unocss/reset@0.53.4/tailwind.css" />,
                )
              },
            })
          `}
        />
      </DocumentationSection>
    </DocumentationPage>
  )
})
