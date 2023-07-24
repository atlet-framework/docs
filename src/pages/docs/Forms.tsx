/** @jsx h */
import { Props, h, withLayout } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import DocsLayout from '../../layouts/DocsLayout.tsx'
import SyntaxHighlight from '../../plugins/highlight/SyntaxHighlight.tsx'
import { DocumentationPage, DocumentationSection } from '../../components/docs/Page.tsx'
import { seo } from '../../plugins/seo.tsx'

export default withLayout(DocsLayout, async (props: Props) => {
  props.page.title = 'Forms'
  props.page.head.push(...seo({
    title: 'Atlet Documentation 🏃 - Forms',
    description: 'How to work with forms in Atlet',
    link: 'https://atlet.deno.dev/docs/forms',
  }))

  return (
    <DocumentationPage 
      {...props} 
      title="Forms"
      previous={{ href: '/docs/static-files', name: 'Static files' }}
      next={{ href: '/docs/rest-api', name: 'Rest API' }}>
      
      <DocumentationSection {...props}>
        <p>
          Thanks to the Deno's builtin <code>Request</code> which contains <code>formData</code> function,
          handling and working with forms is rather easy.
        </p>

        <SyntaxHighlight
          code={`
            /**@jsx h */
            /**@jsxFrag Fragment */
            import { Props, h, Fragment, redirect } from '${Deno.env.get('ATLET_URL')}'
            import { login } from 'legit-auth'

            export default function Login(props: Props) {
              let message = null

              if (props.request.method === 'POST') {
                const form = await props.request.formData()
                const username = form.get('username')?.toString() ?? null
                const password = form.get('password')?.toString() ?? null

                if (login(username, password)) {
                  return redirect('/homepage')
                }

                message = <p>Wrong username or password.</p>
              }

              return (
                <>
                  <h1>Login</h1>
                  {message}
                  <form method="POST">
                    <input name="username" type="text" />
                    <input name="password" type="password" />
                    <button type="submit">Login</button>
                  </form>
                </>
              )
            }
          `}
        />

        <p>Result:</p>

        <div class="border border-gray-300 p-4 bg-white rounded-lg space-y-3">
          <h1 class="text-2xl">Login</h1>
          
          {await (async () => {
            let message = null

            if (props.request.method === 'POST') {
              const form = await props.request.formData()
              const username = form.get('username')?.toString() ?? null
              message = <p class="py-3 px-4 bg-green-100 text-green-600 rounded-lg">No redirect, I believe you {username ?? ''}.</p>
            }

            return message
          })()}

          <form method="POST" class="flex flex-col space-y-2">
            <input placeholder="Username" name="username" type="text" class="py-3 px-4 bg-gray-100 rounded-lg" />
            <input placeholder="Password" name="password" type="password" class="py-3 px-4 bg-gray-100 rounded-lg" />
            <button type="submit" class="bg-gray-800 py-3 px-4 font-medium text-sm mt-2 rounded-md shadow-md text-white">LOGIN</button>
          </form>
        </div>
      </DocumentationSection>
    </DocumentationPage>
  )
})